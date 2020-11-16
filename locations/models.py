from django.db import models
from django.contrib.postgres.fields import ArrayField


class Location(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    lat = models.CharField(max_length=255)
    lng = models.CharField(max_length=255)
    days = ArrayField(models.CharField(max_length=100, blank=True), blank = True, null = True,)
    hours = models.CharField(max_length=255, null=True)
    dayOpen = models.CharField(max_length=255, null=True)
    dayClose = models.CharField(max_length=255, null=True)
    hourOpen = models.CharField(max_length=255, null=True)
    hourClose = models.CharField(max_length=255, null=True)
    website = models.CharField(max_length=255, null=True, blank=True)

# Create your models here.
