from django.urls import path, include


app_name = "api"

urlpatterns = [
    path('menuitem/', include('menu.urls')),
]
