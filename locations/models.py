from django.db import models
from accounts.models import User


class Location(models.Model):
    map_location = models.CharField(max_length=255, default=" ")


    def __str__(self):
        return self.map_location

# Create your models here.
