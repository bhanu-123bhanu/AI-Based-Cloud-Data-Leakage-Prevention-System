from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

uri = os.getenv("MONGODB_URI")

try:
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)

    client.server_info()

    print("✅ MongoDB Connected Successfully")

except Exception as e:
    print("❌ MongoDB Error:")
    print(e)