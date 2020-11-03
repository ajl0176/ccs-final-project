from django.urls import include, path





urlspatterns = [

    path('menu/', include('menu.urls', namespace='menu')),
    path('profile/', include('accounts.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]
