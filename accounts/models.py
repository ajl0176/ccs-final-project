from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models

class User(AbstractUser):
    pass

class Profile(models.Model):
    user = models.OneToOneField(AbstractUser, on_delete=models.CASCADE)

def __str__(self):
    return self.user.username
