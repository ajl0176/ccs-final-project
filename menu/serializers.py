from rest_framework import serializers


from .models import Menuitem, AddOn


class MenuSerializer (serializers.ModelSerializer):

    class Meta:
        model = Menuitem
        fields = ('id', 'entree','price', 'description', 'image', 'is_active')


class AddOnSerializer (serializers.ModelSerializer):

    class Meta:
        model = AddOn
        fields = ('id', 'item','price', 'category', 'is_active')
