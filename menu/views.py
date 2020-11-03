from rest_framework import generics
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied

from .models import Menu
from .serializers import MenuSerializer



class MenuListCreateView(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class AdminMenuListCreateView(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_class = (permissions.IsAdminUser)

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class AdminListDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_class = (permissions.IsAdminUser)

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class MenuListDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
