from rest_framework import serializers


from .models import Event


class EventsSerializer (serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('day','location', 'user')