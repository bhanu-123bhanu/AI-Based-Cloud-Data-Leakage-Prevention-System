from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(
    MONGODB_URI,
    server_api=ServerApi("1")
)

# Test the connection
client.admin.command("ping")
print("✅ Connected to MongoDB Successfully")

db = client[DATABASE_NAME]