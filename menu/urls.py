from django.urls import path, include

from .views import MenuListAPIView

urlpatterns = [
    path('', MenuListAPIView.as_view(), name="menu"),
]
