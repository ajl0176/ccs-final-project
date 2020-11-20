from django.shortcuts import render

from rest_framework import generics, permissions

from .models import Menuitem, AddOn
from .serializers import MenuSerializer, AddOnSerializer



class MenuitemListAPIView (generics.ListAPIView):
    queryset = Menuitem.objects.filter(is_active=True)
    serializer_class = MenuSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class AdminMenuitemListCreateView (generics.ListCreateAPIView):
    queryset = Menuitem.objects.all()
    serializer_class = MenuSerializer
    permission_classes = (permissions.IsAdminUser,)


class AdminMenuitemDetailView (generics.RetrieveUpdateDestroyAPIView):
    queryset = Menuitem.objects.all()
    serializer_class = MenuSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class AddOnListAPIView (generics.ListCreateAPIView):
    queryset = AddOn.objects.filter(is_active=True)
    serializer_class = AddOnSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
