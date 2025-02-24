from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# MySQL Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define a Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    date_joined=db.Column(db.Date, default=datetime.utcnow)#utcnow cuts out the time just adds the date
    def __repr__(self):
        return f"<User {self.name}>"

class Student (db.Model):
    StudentNo=db.Column(db.Integer, primary_key=True)
    ClinicNo=db.Column(db.Integer, unique=True, nullable=False)#setting to nullable because it can be used only for current student the incoming will use the student no only
    fName=db.Column( db.String(50), nullable=False)
    lName=db.Column( db.String(50), nullable=False)
    Phone=db.Column(db.String(25), nullable=True)
    prescription=db.relationship('Prescription',backref='Student')

class Medicine (db.Model):
    MedicineId=db.Column(db.Integer, primary_key=True)
    MedicinceName=db.Column(db.String(50), unique=True, )
    Description=db.Column(db.String(50), )
    PurchaseDate=db.Column(db.Date, nullable=False)
    ExpDate=db.Column(db.Date, nullable=False)
    def __repr__(self):
        return f"<Medicine {self.MedicineName}>"

class Prescription(db.Model):
    PrescriptionId=db.Column(db.Integer, primary_key=True)
    Notes=db.Column(db.String(255))
    studentno=db.Column(db.Integer,db.ForeignKey('student.StudentNo'))#referecne the parent class in lower case then the primary ket



# Create tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/login")
    
@app.route("/")
def helloWorld():
    return "<h1>the server is running</h1>"