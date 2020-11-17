from django.shortcuts import render
from rest_framework import generics, permissions

from .models import Location
from .serializers import LocationsSerializer




class LocationListCreateView(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationsSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class LocationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationsSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


# Create your views here.
