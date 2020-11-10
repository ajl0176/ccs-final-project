from django.shortcuts import render

from rest_framework import generics, permissions

from .models import AddOn
from .serializers import AdditionSerializer



class AddOnListAPIView (generics.ListAPIView):
    queryset = AddOn.objects.filter(is_active=True)
    serializer_class = AdditionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class AdminAddOnListCreateView (generics.ListCreateAPIView):
    queryset = AddOn.objects.all()
    serializer_class = AdditionSerializer
    permission_classes = (permissions.IsAdminUser,)

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class AdminAddOnDetailView (generics.RetrieveUpdateDestroyAPIView):
    queryset = AddOn.objects.all()
    serializer_class = AdditionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
