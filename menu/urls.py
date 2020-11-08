from django.urls import path, include

from .views import MenuitemListAPIView, AdminMenuitemListCreateView

urlpatterns = [
    path('', MenuitemListAPIView.as_view(), name="menuitem"),
    path('form/', AdminMenuitemListCreateView.as_view()),
]
