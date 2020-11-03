from django.urls import path, include

from .views import MenuListAPIView



app_name = "menu"

urlpatterns = [
    path('', MenuListAPIView.as_view(), name="menu"),
    # path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
]
