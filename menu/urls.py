from django.urls import path, include

from .views import MenuitemListAPIView

urlpatterns = [
    path('', MenuitemListAPIView.as_view(), name="menuitem"),
]
