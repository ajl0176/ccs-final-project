from django.urls import path, include

from .views import EventListAPIView, AdminEventListCreateView, EventDetailView

urlpatterns = [
    path('', EventListAPIView.as_view(), name="event"),
    path('form/', AdminEventListCreateView.as_view()),
    path('<int:pk>/', EventDetailView.as_view()),
]
