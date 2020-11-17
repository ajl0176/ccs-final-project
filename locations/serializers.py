from rest_framework import serializers

from .models import Location



class LocationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ('map_location',)
