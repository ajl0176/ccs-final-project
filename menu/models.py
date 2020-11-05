from django.db import models



class Menuitem(models.Model):
    entree = models.CharField(max_length = 255, default ='')
    price = models.CharField(max_length = 255, default ='')
    description = models.CharField(max_length = 1000, default = '')
    image = models.ImageField(upload_to="menu/", blank=True)

    def __str__(self):
        return self.entrees
