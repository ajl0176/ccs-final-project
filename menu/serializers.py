from rest_framework import serializers


from .models import Menuitem


class MenuSerializer (serializers.ModelSerializer):

    class Meta:
        model = Menuitem
        fields = ('entree','price', 'description', 'image')
