from django.urls import path, include

from .views import EventListAPIView, AdminEventListCreateView

urlpatterns = [
    path('', EventListAPIView.as_view(), name="event"),
    path('form/', AdminEventListCreateView.as_view()),
]
