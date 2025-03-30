from django.urls import path
from .views import*
urlpatterns = [
    #registration, login, numberof users
  path("register-clinician/",register_clinician, name="register"), 
  path("login-clinician/", login_clinician, name="login"),
  path('api/user-count/', get_user_count, name='get-user-count'),
  # Patients
    path('patients/', patient_list, name='patient-list'),
    path('patient/<int:pk>/', patient_detail, name='patient-detail'),
    path('patients/<int:patient_id>/visits/', patient_visits, name='patient-visits'),

    # Doctors
   
    # Visits
    #path('visits/', visit_list, name='visit-list'),
    #path('visits-detail/<int:pk>/', visit_detail, name='visit-detail'),
    
    #statistical
    path('statistics/', statistics_view, name="statistics"),

    #prescriptions
    path('visits/<int:visit_id>/prescriptions/', visit_prescriptions, name='visit-prescriptions'),
    path('prescriptions-list/', prescription_list, name='prescription_list'),
    #path('prescriptions/<int:pk>/', prescription_detail, name='prescription_detail'),

]

