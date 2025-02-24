def login(data, db,jsonify):
    # Simulate user authentication (In real-world, check database)
    if data and data.get("email") == "test@example.com" and data.get("password") == "password123":
        return jsonify({
            "name": "John Doe",
            "email": "test@example.com"
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401
