from django.shortcuts import render
from django.views.generic import ListView

from .models import Menu

class MenuListView(ListView):
    model = Menu
    template_name = 'menu_list.html'
