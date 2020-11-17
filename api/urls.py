from django.urls import path, include


app_name = "api"

urlpatterns = [
    path('menuitems/', include('menu.urls')),
    path('events/', include('events.urls')),
    path('addons/', include('addition.urls')),
    path('map_locations/', include('locations.urls')),
]
