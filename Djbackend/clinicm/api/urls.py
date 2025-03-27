from django.urls import path
from .views import*
urlpatterns = [
    #registration, login
  path("register/",user_register, name="register"), 
  path("login/", user_login, name="login"),
  # Patients
    path('api/patients/', patient_list, name='patient-list'),
    path('api/patients/<int:pk>/', patient_detail, name='patient-detail'),

    # Doctors
    path('clinicians/', Clinician_list, name='doctor-list'),
    path('clinician-detail/<int:pk>/', Clinician_detail, name='doctor-detail'),

    # Visits
    path('visits/', visit_list, name='visit-list'),
    path('visits-detail/<int:pk>/', visit_detail, name='visit-detail'),
    
    #statistical
    path('statistics/', statistics_view, name="statistics"),
]

