#speficify class that converts model json data
# because whenever we are working with api send json
#for easy interaction with api
from rest_framework import serializers
from django.contrib.auth import authenticate #checks if user is authenticated the grants access
from .models import CustomUser, Patient, Visit, Vital, Diagnosis, Prescription, Test
from django.contrib.auth import get_user_model

#for user registration

class ClinicianRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser  # This points to the CustomUser model
        fields = ['username', 'first_name', 'last_name', 'email', 'specialty', 'phone_number', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser.objects.create_user(**validated_data)  # Create a user with the password hash
        user.set_password(password)
        user.save()
        return user
'''class ClinicianRegistrationSerializer(serializers.ModelSerializer):
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
        return user'''
 
 


#login serializer 
# For user login
'''class UserLoginSerializer(serializers.Serializer):  # Inherit from serializers.Serializer since its not using a model
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):  # data is being passed as an argument
        user = authenticate(username=data["username"], password=data["password"])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid username or password")'''
class ClinicianLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return user



class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


'''class ClinicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = ''
        fields = '__all__' '''


class VisitSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)  # Nested serialization
    #clinician = ClinicianSerializer(read_only=True)

    class Meta:
        model = Visit
        fields = '__all__'


class VitalSerializer(serializers.ModelSerializer):
    visit = VisitSerializer(read_only=True)

    class Meta:
        model = Vital
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



