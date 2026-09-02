from motor.motor_asyncio import AsyncIOMotorClient
from config import get_settings

settings = get_settings()

client = None
db = None

async def connect_db():
    global client, db
    try:
        client = AsyncIOMotorClient(settings.MONGO_URI, serverSelectionTimeoutMS=4000)
        await client.admin.command('ping')
        db = client[settings.DB_NAME]
        print(f"Connected to MongoDB Atlas — database: {settings.DB_NAME}")
    except Exception as e:
        print(f"[MongoDB Warning] Connection to Atlas failed: {e}")
        print("[MongoDB Info] Falling back to local in-memory database so registration, login, and reports work seamlessly.")
        try:
            from mongomock_motor import AsyncMongoMockClient
            client = AsyncMongoMockClient()
            db = client[settings.DB_NAME]
            print(f"[MongoDB Info] In-memory database active for '{settings.DB_NAME}'.")
        except Exception as mock_err:
            print(f"[MongoDB Error] Could not initialize fallback: {mock_err}")
            client = None
            db = None

async def close_db():
    global client
    if client:
        client.close()
        print("MongoDB connection closed.")

def get_db():
    return db