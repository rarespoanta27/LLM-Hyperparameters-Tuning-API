from pymongo import MongoClient
from bson.objectid import ObjectId
import bcrypt


client = MongoClient("mongodb://localhost:27017/") 
db = client["user_database"] 
users_collection = db["users"] 

def create_user(name, email, password):
    
    if users_collection.find_one({"email": email}):
        return {"error": "Un utilizator cu acest email există deja."}
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    user = {
        "name": name,
        "email": email,
        "password": hashed_password.decode('utf-8')
    }
    users_collection.insert_one(user)
    return {"message": "Utilizator creat cu succes!"}

def verify_user(email, password):
    user = users_collection.find_one({"email": email})
    if not user:
        return None
    if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return user
    return None
