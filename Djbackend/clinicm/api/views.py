from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout
from .serializers import (ClinicianRegistrationSerializer,ClinicianLoginSerializer,PatientSerializer, VisitSerializer, 
     DiagnosisSerializer, PrescriptionSerializer, CustomUserSerializer )
from .models import CustomUser, Patient, Visit, Prescription
from rest_framework import status
from django.db.models import Q

# user Registration View

@api_view(['POST'])
def register_clinician(request):
    """ Register a new clinician """
    serializer = ClinicianRegistrationSerializer(data=request.data)

    if serializer.is_valid():
        user=serializer.save()
        return Response({
                'user': {
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'specialty': user.specialty,
                    'phone_number': user.phone_number,
                }
            }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=400)
'''
payload
'''

'''
{
    "email": "janedoe@example.com",
    "first_name": "Jane",
    "last_name": "Doe",
    "specialty": "doctor",
    "phone_number": "1234567890",
    "password": "password123"
}

'''

# User Login View
@api_view(['POST'])
def login_clinician(request):
    """ Log in clinician and return authentication token """
    serializer = ClinicianLoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = CustomUserSerializer(user)
        return Response({'user': user_serializer.data,"token": token.key})
    
    return Response({"error": "Invalid credentials"}, status=400)

''' payload
{
    "email": "janedoe@example.com",
    "password": "password123"
}
'''

'''@api_view(['POST'])
def user_login(request):
    if request.method == 'POST': #check if the request is a post request 
        serializer = UserLoginSerializer(data=request.data) #get data passed from the request  body
        # request.data handles different content type such json, form data 
        if serializer.is_valid():
            user = serializer.validated_data
            token, created = Token.objects.get_or_create(user=user)#gets token if user exits or creates a new one if it does'nt
             #used for authenticate, allow user to logging after themsleves after loging
            #for securing the endpoints  and ensuere that only authenticated user can access certain resources

            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)'''

@api_view(['GET'])
def get_user_count(request):
    """ Retrieve the total number of users """
    clinicians = CustomUser.objects.all()  # Count all users
    serializer = CustomUserSerializer(clinicians, many=True)
    return Response({
        #"total_users": clinician_count,
        "users": serializer.data  # Include the serialized user data in the response
    })
    




#patient list
@api_view(['GET', 'POST'])
def patient_list(request):
    patients=Patient.objects.all()
    

    if request.method == 'GET':
        # Get search parameters from query params
        # Get search parameters from query params
        patient_id = request.query_params.get('patient_id', None)
        name = request.query_params.get('name', None)
        phone_number = request.query_params.get('phone_number', None)
        email = request.query_params.get('email', None)

        # Start with all patients
        patients = Patient.objects.all()

        # Filter by student_id if provided
        if patient_id:
            patients = patients.filter(id__exact=patient_id)

        if phone_number:
            patients = patients.filter(phone_number__icontains=phone_number)

        # Filter by name if provided (search first name or last name)
        if name:
            patients = patients.filter(
                Q(first_name__icontains=name) | Q(last_name__icontains=name)
            )
        #filter by email
        if email:
            patients = patients.filter(email__iexact=email)
        #Q object in Django is used to build complex queries for filtering data. It allows you
        #  to combine multiple conditions with AND, OR, and NOT operators, 
        # and it enables you to perform more advanced filtering, like searching multiple fields at once.
        
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#patient detail
@api_view(['GET', 'PUT', 'DELETE'])
def patient_detail(request, pk):
    try:
        patient = Patient.objects.get(pk=pk) #gets the patient using primary key 
        
    except Patient.DoesNotExist:
        return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND) #error if not found
    
    if request.method == 'GET':
        serializer = PatientSerializer(patient)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PatientSerializer(patient, data=request.data) #gets data from the request body
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)#returns data 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    




@api_view(['GET','POST','DELETE'])
def patient_visits(request, patient_id):
    """
    Get all visits for a specific patient.
    """
    patient = get_object_or_404(Patient, pk=patient_id)
    if request.method=="GET":
        visits = Visit.objects.filter(patient=patient)

        serializer = VisitSerializer(visits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method=="POST":
        serializer=VisitSerializer(data=request.data)#iinitailiz the serialize with data passed
        if serializer.is_valid():
            serializer.save(patient=patient)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    '''elif request.method == 'DELETE':
        visits.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)'''



#


"""@api_view(['GET', 'POST']) #== unecessary because it deisplays all visits in the table that are need
def visit_list(request):
    if request.method == 'GET':
        visits = Visit.objects.all()
        serializer = VisitSerializer(visits, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = VisitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)"""


#visits view api
@api_view(['GET', 'PUT', 'DELETE'])
def create_delete_visit(request, pk):
    try:
        visit = Visit.objects.get(pk=pk)
    except Visit.DoesNotExist:
        return Response({'error': 'Visit not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VisitSerializer(visit)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = VisitSerializer(visit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        visit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





#medical view api


#Stats
@api_view(['GET'])
def statistics_view(request):
    data = {
        "total_patients": Patient.objects.count(),
        "total_visits": Visit.objects.count(),
        "total_prescriptions": Prescription.objects.count(),
    }
    return Response(data)



@api_view(['GET', 'POST'])
def prescription_list(request):
    if request.method == 'GET':
        prescriptions = Prescription.objects.all()
        serializer = PrescriptionSerializer(prescriptions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PrescriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
def visit_prescriptions(request, visit_id):
    """
    Retrieve all prescriptions for a visit or add a new one.
    """
    visit = get_object_or_404(Visit, pk=visit_id)

    if request.method == 'GET':
        prescriptions = Prescription.objects.filter(visit=visit)
        serializer = PrescriptionSerializer(prescriptions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = PrescriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(visit=visit)  # Associate prescription with visit
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve, Update, or Delete a specific prescription
'''@api_view(['GET', 'PUT', 'DELETE'])
def prescription_detail(request, pk):
    try:
        prescription = Prescription.objects.get(pk=pk)
    except Prescription.DoesNotExist:
        return Response({'error': 'Prescription not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PrescriptionSerializer(prescription)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PrescriptionSerializer(prescription, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        prescription.delete()
        return Response({"prescription deleted"},status=status.HTTP_204_NO_CONTENT)'''