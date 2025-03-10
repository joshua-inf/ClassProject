from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import controllers.authcontrollers as authCon
from flask_cors import CORS


app = Flask(__name__)

# MySQL Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Iloveanime@localhost/classproj'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)\
# Define a Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    def __repr__(self):
        return f"<User {self.name}>"

# Create tables
with app.app_context():
    db.create_all()
    

if __name__ == "__main__":
    app.run(debug=True)

CORS(app)  # Enables CORS for all routes
# login endpoint    
@app.route('/login', methods=['POST'])
def login():
    data = request.json  # Get JSON data from request
    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return authCon.login(data,db, jsonify)
   
@app.route("/")
def helloWorld():
    return "<h1>the server is running</h1>"