from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps
import bcrypt  # For hashing passwords

app = Flask(__name__)
CORS(app)

# MongoDB setup (replace with your MongoDB URI if using MongoDB Atlas)
client = MongoClient("mongodb://localhost:27017")  # For local MongoDB
# client = MongoClient("your_mongodb_atlas_connection_string")  # If using MongoDB Atlas
db = client["signup_db"]  # Use the 'signup_db' database
users_collection = db["users"]  # Use the 'users' collection

# Signup endpoint
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    if not name or not email or not phone or not password:
        return jsonify({"error": "All fields are required"}), 400

    # Check if the email already exists in the database
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    # Insert user data into MongoDB
    new_user = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": hashed_password.decode("utf-8")  # Store as string for JSON compatibility
    }

    users_collection.insert_one(new_user)

    return jsonify({"message": "User registered successfully!"}), 200

# Signin endpoint
@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Find the user by email
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    # Verify the password
    if not bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
        return jsonify({"error": "Invalid email or password"}), 401

    # Successful login
    return jsonify({"message": "Login successful", "token": "dummy_token_for_now"}), 200

if __name__ == "__main__":
    app.run(debug=True)
