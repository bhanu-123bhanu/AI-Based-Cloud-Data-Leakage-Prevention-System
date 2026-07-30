from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from database import db
from password_utils import hash_password, verify_password
from auth.jwt_handler import create_access_token
from fastapi import Depends
from auth.dependencies import verify_token
from fastapi import UploadFile, File
import shutil
from verify import verify_document
from datetime import datetime
import os

from fastapi.middleware.cors import CORSMiddleware
from utils.hash_utils import generate_sha256
from utils.encryption import encrypt_file
from blockchain.blockchain import blockchain




app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RegisterUser(BaseModel):
    fullname: str
    email: str
    phone: str
    password: str
    role: str
class LoginUser(BaseModel):
    email: str
    password: str

@app.get("/")
def home():
    return {
        "message": "THIS IS MY NEW API KEY"
    }

@app.post("/register")
def register(user: RegisterUser):

    print("STEP 1")

    users_collection = db["users"]

    print("STEP 2")

    hashed = hash_password(user.password)

    print("STEP 3")

    user_data = {
        "fullname": user.fullname,
        "email": user.email,
        "phone": user.phone,
        "password": hashed,
        "role": user.role
    }

    print("STEP 4")

    result = users_collection.insert_one(user_data)

    print("STEP 5")

    return {
        "message": "User Registered Successfully",
        "user_id": str(result.inserted_id)
    }

@app.post("/login")
def login(user: LoginUser):

    users_collection = db["users"]

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user is None:
        raise HTTPException(
            status_code=401,
            detail="User Not Found"
        )

    if not verify_password(
        user.password,
        existing_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect Password"
        )

    token = create_access_token(
        {
            "email": existing_user["email"],
            "role": existing_user["role"]
        }
    )
    blockchain.add_block(
        action="Login",
        fullname=existing_user["fullname"],
        email=existing_user["email"],
        role=existing_user["role"],
        status="Success"
    )

    return {
        "status": "Success",
        "message": "Login Successful",
        "access_token": token,
        "token_type": "bearer",
        "fullname": existing_user["fullname"],
        "email": existing_user["email"],
        "role": existing_user["role"]
    }


@app.post("/upload")
def upload(
    file: UploadFile = File(...),
    user=Depends(verify_token)
):

    file_path = os.path.join(
        "uploads",
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )
    encrypted_path = encrypt_file(file_path)

    

    file_hash = generate_sha256(file_path)



    documents_collection = db["documents"]
    users_collection = db["users"]

    owner = users_collection.find_one(
        {"email": user["email"]}
    )
    block = blockchain.add_block(
    action="Upload",
    fullname=owner["fullname"],
    email=owner["email"],
    role=owner["role"],
    filename=file.filename,
    sha256=file_hash,
    status="Uploaded"
)

    documents_collection.insert_one({
    "filename": file.filename,
    "owner": owner["fullname"],
    "uploaded_by": owner["email"],
    "role": owner["role"],
    "upload_date": datetime.now().strftime("%d-%m-%Y %I:%M %p"),
    "saved_location": file_path,
    "encrypted_location": encrypted_path,
    "status": "Uploaded",
    "sha256": file_hash,

    "block_number": block["index"],
    "block_timestamp": block["timestamp"]
})

    activity_collection = db["activity_logs"]

    activity_collection.insert_one({
        "user": owner["fullname"],
        "email": owner["email"],
        "action": "Upload",
        "document": file.filename,
        "time": datetime.now().strftime("%d-%m-%Y %I:%M %p")
    })

    return {
        "message": "File Uploaded Successfully",
        "filename": file.filename,
        "owner": owner["fullname"],
        "uploaded_by": owner["email"],
        "upload_date": datetime.now().strftime("%d-%m-%Y %I:%M %p")
    }
@app.get("/documents")
def get_documents():

    documents_collection = db["documents"]

    documents = list(documents_collection.find({}, {"_id": 0}))

    return {
        "documents": documents
    }

from fastapi import UploadFile, File

@app.post("/verify")
def verify(file: UploadFile = File(...)):

    documents_collection = db["documents"]

    latest_document = documents_collection.find_one(
        sort=[("_id", -1)]
    )

    if latest_document is None:
        return {
            "message": "No document found"
        }

    # Generate current SHA-256
    os.makedirs("verify_files", exist_ok=True)

    verify_path = os.path.join("verify_files", file.filename)

    with open(verify_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    current_hash = generate_sha256(verify_path)

    # Read stored SHA-256
    stored_hash = latest_document["sha256"]

    # Compare
    if current_hash == stored_hash:
        integrity = "Original"
    else:
        integrity = "Tampered"

    # Existing AI verification
    ai_result = verify_document(verify_path)
    documents_collection.update_one(
    {"_id": latest_document["_id"]},
    {
        "$set": {
            "status": integrity,
            "verification_time": datetime.now().strftime("%d-%m-%Y %I:%M %p")
        }
    }
)
@app.get("/activity")
def get_activity():

    activity_collection = db["activity_logs"]

    logs = list(
        activity_collection.find({}, {"_id": 0})
    )

    return {
        "logs": logs
    }
    return {
        "integrity": integrity,
        "stored_hash": stored_hash,
        "current_hash": current_hash,
        "ai_result": ai_result
    }
@app.get("/dashboard")
def get_dashboard():

    documents_collection = db["documents"]

    total_documents = documents_collection.count_documents({})

    verified_documents = documents_collection.count_documents({
        "status": "Uploaded"
    })

    encrypted_documents = documents_collection.count_documents({
        "encrypted_location": {"$exists": True}
    })

    blockchain_records = len(blockchain.get_chain())

    return {
        "total_documents": total_documents,
        "verified_documents": verified_documents,
        "encrypted_documents": encrypted_documents,
        "blockchain_records": blockchain_records
    }