from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
# inheriting from Abstruct user because we want to customize already exiting fileds of user model
class CustomUser(AbstractUser):
    StudentId=models.CharField(max_length=20, unique=True)
    
    
    def __str__(self):
        return self.StudentId