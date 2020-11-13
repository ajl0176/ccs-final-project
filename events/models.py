from django.db import models
from accounts.models import User


class Event(models.Model):
    day = models.CharField(max_length =255, default='')
    location = models.CharField(max_length=255, default='')
    is_active = models.BooleanField(default=False)


    def __str__(self):
        return self.day
