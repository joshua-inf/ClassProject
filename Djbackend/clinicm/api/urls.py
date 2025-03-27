from django.urls import path
from .views import*
urlpatterns = [
    #registration, login
  path("register-clinician/",register_clinician, name="register"), 
  path("login-clinician/", login_clinician, name="login"),
  # Patients
    path('patients/', patient_list, name='patient-list'),
    path('patient/<int:pk>/', patient_detail, name='patient-detail'),

    # Doctors
    path('clinicians/', Clinician_list, name='doctor-list'),
    path('clinician-detail/<int:pk>/', Clinician_detail, name='doctor-detail'),

    # Visits
    path('visits/', visit_list, name='visit-list'),
    path('visits-detail/<int:pk>/', visit_detail, name='visit-detail'),
    
    #statistical
    path('statistics/', statistics_view, name="statistics"),
]

