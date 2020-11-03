from django.urls import path


from .views import MenuListCreateView, AdminMenuListCreateView, AdminListDetailView, MenuListDetailView

app_name = "menu"

urlpatterns = [
    path('', MenuListCreateView.as_view()),
    path('<int:pk>/', MenuListDetailView.as_view()),
    path('admin/', AdminMenuListCreateView.as_view()),
    path('admin/<int:pk>/', AdminListDetailView.as_view()),
]
