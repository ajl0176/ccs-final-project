from django.shortcuts import render

from rest_framework import generics

from menu.models import Menu
from .serializers import MenuSerializer



class MenuListAPIView (generics.ListAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
