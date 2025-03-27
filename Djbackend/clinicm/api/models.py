from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
# inheriting from Abstract user because we want to customize already exiting fields of user model
class CustomUser(AbstractUser):
    StudentId=models.CharField(max_length=20, unique=True)
    
    
    def __str__(self):
        return self.StudentId

class Patient(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    dob = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True, null=True, blank=True)
    address = models.TextField()
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    customuser=models.ForeignKey(CustomUser, on_delete=models.CASCADE )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    


class Clinician(models.Model): #
    POSITION= [
        ('doctor', 'doctor'),
        ('nurse', 'nurse'),
        ('clinic officer', 'clinical officer'),
    ]
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100,choices=POSITION)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name} - {self.specialty}"


class Visit(models.Model):
    VISIT_TYPE_CHOICES = [
        ('Routine', 'Routine'),
        ('Emergency', 'Emergency'),
        ('Follow-up', 'Follow-up'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="visits")
    clinician = models.ForeignKey(Clinician, on_delete=models.SET_NULL, null=True, blank=True, related_name="visits")
    visit_date = models.DateTimeField()
    visit_type = models.CharField(max_length=50, choices=VISIT_TYPE_CHOICES)
    reason_for_visit = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Visit {self.id} - {self.patient.first_name} {self.patient.last_name}"
    
    

class Vital(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="vitals")
    blood_pressure = models.CharField(max_length=20, )  # Example: "120/80"
    heart_rate = models.IntegerField()
    respiratory_rate = models.IntegerField(null=True)
    temperature = models.DecimalField(max_digits=5, decimal_places=2)  # Celsius or Fahrenheit
    oxygen_saturation = models.DecimalField(max_digits=5, decimal_places=2)  # SpO2 in percentage
    weight = models.DecimalField(max_digits=5, decimal_places=2)  # in kg
    height = models.DecimalField(max_digits=5, decimal_places=2)  # in cm

    def __str__(self):
        return f"Vitals for Visit {self.visit.id}"


class MedicalHistory(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="medical_history")
    chronic_conditions = models.TextField(blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)
    current_medications = models.TextField(blank=True, null=True)
    surgeries = models.TextField(blank=True, null=True)
    family_history = models.TextField(blank=True, null=True)
    social_history = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Medical History for {self.patient.first_name} {self.patient.last_name}"


class Diagnosis(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="diagnoses")
    diagnosis = models.TextField()
    icd10_code = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"Diagnosis for Visit {self.visit.id}"


class Prescription(models.Model): #for medication tracking
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="prescriptions") 
    medication_name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=100)
    quantity = models.IntegerField()
    refills = models.IntegerField(default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    instructions = models.TextField()

    def __str__(self):
        return f"Prescription for Visit {self.visit.id}"
    
    


class Test(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Canceled', 'Canceled'),
    ]

    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="tests")
    test_name = models.CharField(max_length=255)
    test_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    results = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Test {self.test_name} for Visit {self.visit.id}"


class FollowUp(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="followups")
    followup_date = models.DateTimeField()
    doctor_notes = models.TextField()

    def __str__(self):
        return f"Follow-up for Visit {self.visit.id}"