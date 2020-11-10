from django.db import models
from accounts.models import User


class AddOn(models.Model):
    item = models.CharField(max_length = 255)
    price = models.CharField(max_length = 255)
    category = models.CharField(max_length=255, default="")
    is_active = models.BooleanField(default=False)


    def __str__(self):
        return self.item


class Menuitem(models.Model):
    entree = models.CharField(max_length = 255)
    price = models.CharField(max_length = 255)
    description = models.CharField(max_length = 1000)
    image = models.ImageField(upload_to="menu/", blank=True)
    is_active = models.BooleanField(default=False)


    def __str__(self):
        return self.entree
