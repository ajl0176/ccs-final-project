from django.db import models


class Menu(models.Model):
    item = models.CharField(max_length = 255, default ='')
    price = models.CharField(max_length = 255, default ='')
    description = models.CharField(max_length = 1000, default = '')
    image = models.ImageField(upload_to="menu/")

    def __str__(self):
        return self.item
