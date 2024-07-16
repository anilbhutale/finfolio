# admin.py
from django.contrib import admin
from .models import User
from unfold.admin import ModelAdmin


class OptionAdmin(ModelAdmin):
    list_display = ("id", "name", "description")
    search_fields = ("name", "description")


admin.site.register(User, OptionAdmin)
