from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_auth.models import TokenModel



from .models import Menu

User = get_user_model()

class MenuSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Menu
        fields = ('item', 'price', 'description', 'image')

class TokenSerializer(serializers.ModelSerializer):
    is_staff = serializers.ReadOnlyField(source='user.is_staff')
    class Meta:
        model = TokenModel
        fields = ('key', 'is_staff')
