from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# models here.
# inheriting from Abstract user because we want to customize already exiting fields of user model

class CustomUserManager(BaseUserManager):
    """ Custom user manager to use email as the unique identifier instead of username. """
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    username = None  # Remove username field
    email = models.EmailField(unique=True)  # Use email as the unique identifier
    specialty = models.CharField(max_length=100, choices=[('doctor', 'Doctor'), ('nurse', 'Nurse'), ('clinic officer', 'Clinical Officer')])
    phone_number = models.CharField(max_length=20)

    USERNAME_FIELD = 'email'  # Set email as the unique identifier
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()  # Use the custom manager

    def __str__(self):
        return self.email


class Patient(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]


    patient= models.CharField(max_length=10, unique=True, primary_key=True, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    dob = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True, null=True, blank=True)
    Patient_type=models.CharField(max_length=200)
    address = models.TextField()
    emergency_contact_name = models.CharField(max_length=100, null=True)
    emergency_contact_phone = models.CharField(max_length=20, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
   # customuser=models.ForeignKey(CustomUser, on_delete=models.CASCADE )

    def save(self, *args, **kwargs):
            if not self.patient_id:  
                last_patient = Patient.objects.order_by('-patient_id').first()
                if last_patient and last_patient.patient_id.isdigit():
                    new_id = int(last_patient.patient_id) + 1
                else:
                    new_id = 2500  # Start from 2500 if no patients exist
                self.patient_id = str(new_id)

            super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    


class Visit(models.Model):
    VISIT_TYPE_CHOICES = [
        ('Normal', 'Normal'),
        ('Emergency', 'Emergency'),
        
    ]
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="visits")
    clinician = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name="visits")
    blood_pressure = models.CharField(max_length=20, )  # Example: "120/80"
    temperature = models.DecimalField(max_digits=5, decimal_places=2)  # Celsius or Fahrenheit
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    visit_type = models.CharField(max_length=50, choices=VISIT_TYPE_CHOICES)
    reason_for_visit = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f"Visit {self.id} - {self.patient.first_name} {self.patient.last_name}"
    
    



class Diagnosis(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="diagnoses")
    diagnosis = models.TextField()
    

    def __str__(self):
        return f"Diagnosis for Visit {self.visit.id}"


class Prescription(models.Model): #for medication tracking
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="prescriptions") 
    medication_name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=100)
    quantity = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    instructions = models.TextField()

    def __str__(self):
        return f"Prescription for Visit {self.visit.id}"
    
    
























"""class Test(models.Model):
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
        return f"Test {self.test_name} for Visit {self.visit.id}" """


