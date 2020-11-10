from django.urls import path, include

from .views import AddOnListAPIView, AdminAddOnListCreateView, AdminAddOnDetailView

urlpatterns = [
    path('', AddOnListAPIView.as_view(), name="AddOn"),
    path('form/', AdminAddOnListCreateView.as_view()),
    path('form/<int:pk>/',AdminAddOnDetailView.as_view()),
]
