from django.urls import path


from .views import MenuListView

app_name = "menu"

urlpatterns = [
    path('', MenuListView.as_view(), name="menu")
]
