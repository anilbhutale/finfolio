# views.py
from django.shortcuts import redirect
from django.contrib import admin
from django.http import JsonResponse

def toggle_sidebar(request):
    # Your logic for toggling the sidebar
    # Redirect to the admin page or update the session as needed
    return JsonResponse({"status": "Sidebar toggled"})

