from django.shortcuts import render, redirect
from django.views.generic import TemplateView

class DashboardView(TemplateView):
    template_name = 'dashboard/dashboard.html'