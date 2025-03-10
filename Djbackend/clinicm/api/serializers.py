#speficify class that converts model json data
# because whenever we are working with api send json
#for easy interaction with api
from rest_framework import serializers
from django.contrib.auth import authenticate #checks if user is authenticated the grants access
from .models import CustomUser, Patient, Clinician, Visit, Vital, MedicalHistory, Diagnosis, Prescription, Test, FollowUp

#for user registration
class UserRegistrationSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)#accepts user data but not include in reponse for security


    class Meta:
        model=CustomUser
        fields=['username', "StudentId", 'first_name', 'last_name',"password"] #some built in fields in the user model except StudentNo
    #modify existing create method to handle the studentId 
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            StudentId=validated_data['StudentId'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''), # to avoid key error incase of missing data to avoid confilict in database we put empty string
            last_name=validated_data.get('last_name', ''),
            
        )
        return user
    #json test payload
   # {
   # "username": "username",
   # "StudentId": "33342",
   # "password": "jsmjsnnc",
   # "first_name": "zed",
   # "last_name": "surname"
   #}



#login serializer 
# For user login
class UserLoginSerializer(serializers.Serializer):  # Inherit from serializers.Serializer since its not using a model
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):  # data is being passed as an argument
        user = authenticate(username=data["username"], password=data["password"])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid username or password")



class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class ClinicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinician
        fields = '__all__'


class VisitSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)  # Nested serialization
    clinician = ClinicianSerializer(read_only=True)

    class Meta:
        model = Visit
        fields = '__all__'


class VitalSerializer(serializers.ModelSerializer):
    visit = VisitSerializer(read_only=True)

    class Meta:
        model = Vital
        fields = '__all__'


class MedicalHistorySerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)

    class Meta:
        model = MedicalHistory
        fields = '__all__'


class DiagnosisSerializer(serializers.ModelSerializer):
    visit = VisitSerializer(read_only=True)

    class Meta:
        model = Diagnosis
        fields = '__all__'


class PrescriptionSerializer(serializers.ModelSerializer):
    visit = VisitSerializer(read_only=True)

    class Meta:
        model = Prescription
        fields = '__all__'


class TestSerializer(serializers.ModelSerializer):
    visit = VisitSerializer(read_only=True)

    class Meta:
        model = Test
        fields = '__all__'


class FollowUpSerializer(serializers.ModelSerializer):
    visit = VisitSerializer(read_only=True)

    class Meta:
        model = FollowUp
        fields = '__all__'