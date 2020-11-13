from django.shortcuts import render

from rest_framework import generics, permissions

from .models import Event
from .serializers import EventsSerializer



class EventListAPIView (generics.ListAPIView):
    queryset = Event.objects.filter(is_active=True)
    serializer_class = EventsSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class AdminEventListCreateView (generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventsSerializer
    permission_classes = (permissions.IsAdminUser,)

class EventDetailView (generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventsSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
