from rest_framework import serializers


from .models import AddOn


class AdditionSerializer (serializers.ModelSerializer):

    class Meta:
        model = AddOn
        fields = ('id', 'item','price', 'category', 'is_active',)
