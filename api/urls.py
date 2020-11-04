from django.urls import path, include


app_name = "api"

urlpatterns = [
    path('menu/', include('menu.urls')),
]
