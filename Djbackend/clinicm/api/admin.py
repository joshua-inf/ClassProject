from django.contrib import admin
from .models import*

# Register your models here.

admin.site.register(Visit)
admin.site.register(Vital)
admin.site.register(Prescription)
#admin.site.register(Clinician)
admin.site.register(Test)
admin.site.register(Patient)
admin.site.register(CustomUser)

