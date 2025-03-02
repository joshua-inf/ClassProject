from flask import Flask, jsonify, request
import mysql.connector
import uuid 

app = Flask(__name__)

#MySQL database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'mypassword', #to be edited
    'database': 'yourdatabase'#to be edited
}

#function to connect to the MySQL database
def get_db_connection():
    return mysql.connector.connect(**db_config)

#route to fetch data from the database based on a token
@app.route('/api/data/<token>', methods = ['GET'])
def get_data(token):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM your_table WHERE token = %s")# replace with table name
        data = cursor.fetchone()
        cursor.close()
        connection.close()
        if not row:
            return jsonify({"error": "No Data found for the provided token"}), 404
            return jsonify(row) 
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# route to insert data into the database
@app.route('/api/data', methods=['POST'])
def insert_data():
    try:
        data = request.json
        token =  str(uuid.uuid4())
        connection= get_db_connection()
        cursor = connection.cursor()
        #insert data into the database with the generated token
        query = "INSERT INTO your_table (token, column1, column2) VALUES (%s, %s, %s)"
        cursor.execute(query,(data['column1'], data['column2']))
        connection.commit()
        cursor.close()
        connection.close()
        #return the generated token
        return jsonify({"token": token}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)
    