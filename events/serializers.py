from rest_framework import serializers


from .models import Event


class EventsSerializer (serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('id', 'date','start_time', 'end_time', 'location', 'address', 'is_active')
