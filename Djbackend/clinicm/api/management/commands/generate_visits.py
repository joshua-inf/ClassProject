from django.core.management.base import BaseCommand
from api.models import Visit, Patient, CustomUser
from faker import Faker
import random

fake = Faker()

class Command(BaseCommand):
    help = "Generate dummy visit records"

    def handle(self, *args, **kwargs):
        patients = list(Patient.objects.all())
        clinicians = list(CustomUser.objects.filter(is_staff=True))  # Assuming clinicians are staff

        if not patients or not clinicians:
            self.stdout.write(self.style.ERROR("No patients or clinicians found. Please add some first."))
            return

        for _ in range(10):  # Generate 10 dummy visits
            visit = Visit.objects.create(
                patient=random.choice(patients),
                clinician=random.choice(clinicians),
                blood_pressure=f"{random.randint(90, 140)}/{random.randint(60, 90)}",
                temperature=round(random.uniform(35.0, 39.0), 1),
                weight=round(random.uniform(50.0, 100.0), 1),
                visit_type=random.choice(["Normal", "Emergency"]),
                reason_for_visit=fake.sentence()
            )
            self.stdout.write(self.style.SUCCESS(f"Created visit {visit.id}"))

        self.stdout.write(self.style.SUCCESS("Dummy visits generated successfully!"))