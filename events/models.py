from django.db import models
from accounts.models import User


class Event(models.Model):
    day = models.CharField(max_length =255, default='')
    location = models.TextField()
    is_active = models.BooleanField(default=False)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.day
