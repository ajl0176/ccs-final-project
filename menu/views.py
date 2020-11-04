from django.shortcuts import render

from rest_framework import generics

from .models import Menu
from .serializers import MenuSerializer



class MenuListAPIView (generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
