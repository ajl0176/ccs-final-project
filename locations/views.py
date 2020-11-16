from rest_framework import generics
from rest_framework import permissions

from .models import location
from .serializers import LocationSerializer




class LocationListCreateView(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = (permsissions.IsAuthenticatedOrReadOnly,)

class LocationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = (permsissions.IsAuthenticatedOrReadOnly,)


# Create your views here.
