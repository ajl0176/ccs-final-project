from rest_framework import serializers


from .models import Menuitem, AddOn


class MenuSerializer (serializers.ModelSerializer):

    class Meta:
        model = Menuitem
        fields = ('id', 'entree','price','checkbox', 'description', 'image', 'is_active')


class AddOnSerializer (serializers.ModelSerializer):

    class Meta:
        model = AddOn
        fields = ('id', 'item','price', 'checkbox', 'category', 'is_active')
