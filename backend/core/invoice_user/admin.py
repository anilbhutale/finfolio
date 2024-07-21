# admin.py
from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import User


class OptionAdmin(ModelAdmin):
    list_display = ("id", "name", "description")
    search_fields = ("name", "description")


admin.site.register(User, OptionAdmin)
