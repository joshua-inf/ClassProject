from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout
from .serializers import (UserRegistrationSerializer,UserLoginSerializer,PatientSerializer, ClinicianSerializer, VisitSerializer, VitalSerializer, 
    MedicalHistorySerializer, DiagnosisSerializer, PrescriptionSerializer, 
    TestSerializer, FollowUpSerializer)
from .models import CustomUser, Patient, Clinician, Test, Vital, Visit, FollowUp, MedicalHistory
from rest_framework import status

# user Registration View
@api_view(['POST'])
def user_register(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'user successfully registered'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Login View
@api_view(['POST'])
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Delete view




#patient list
@api_view(['GET', 'POST'])
def patient_list(request):
    if request.method == 'GET':
        patients = Patient.objects.all()
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
    



#clinicians
@api_view(['GET', 'POST'])
def Clinician_list(request):
    if request.method == 'GET':
        clinician = Clinician.objects.all()
        serializer = ClinicianSerializer(clinician, many=True) #returns all clinicians
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ClinicianSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def Clinician_detail(request, pk):
    try:
        clinician = Clinician.objects.get(pk=pk)
    except Clinician.DoesNotExist:
        return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ClinicianSerializer(clinician)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ClinicianSerializer(clinician, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        clinician.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#vists view api
@api_view(['GET', 'PUT', 'DELETE'])
def visit_detail(request, pk):
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




