from django.urls import path, include

from .views import MenuitemListAPIView, AdminMenuitemListCreateView, AdminMenuitemDetailView, AddOnListAPIView

urlpatterns = [
    path('', MenuitemListAPIView.as_view(), name="menuitem"),
    path('form/', AdminMenuitemListCreateView.as_view()),
    path('form/<int:pk>/',AdminMenuitemDetailView.as_view()),
    path('addons/', AddOnListAPIView.as_view()),
]
