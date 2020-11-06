from django.shortcuts import render

from rest_framework import generics, permissions

from .models import Menuitem
from .serializers import MenuSerializer



class MenuitemListAPIView (generics.ListAPIView):
    queryset = Menuitem.objects.filter(is_active=True)
    serializer_class = MenuSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class AdminMenuitemListCreateView (generics.ListCreateAPIView):
    queryset = Menuitem.objects.all()
    serializer_class = MenuSerializer
    permission_classes = (permissions.IsAdminUser,)

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
