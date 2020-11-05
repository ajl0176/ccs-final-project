from django.shortcuts import render

from rest_framework import generics

from .models import Menuitem
from .serializers import MenuSerializer



class MenuitemListAPIView (generics.ListCreateAPIView):
    queryset = Menuitem.objects.all()
    serializer_class = MenuSerializer
