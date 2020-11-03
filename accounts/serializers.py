from rest_framework import serializers
from rest_auth.models import TokenModel


from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Profile
        fields = ('id', 'user')

class TokenSerializer(serializers.ModelSerializer):
    is_staff = serializers.ReadOnlyField(source = 'user.is_staff')

    class Meta:
        model = TokenModel
        fields = ('key', 'is_staff')
