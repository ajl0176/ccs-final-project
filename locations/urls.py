from django.urls import path, include

from .views import LocationListCreateView, LocationDetailView



urlpatterns = [
    path('<int:pk>', LocationDetailView.as_view(), name="location"),
    path('', LocationListCreateView.as_view()),
]
