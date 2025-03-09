from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout
from .serializers import UserRegistrationSerializer,UserLoginSerializer
from .models import CustomUser
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

    

