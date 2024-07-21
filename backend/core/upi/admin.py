# admin.py
from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import UPI, UPIApp


@admin.register(UPIApp)
class UPIAppAdmin(ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(UPI)
class UPIAdmin(ModelAdmin):
    list_display = ("upi_id", "app", "user")
    search_fields = ("upi_id", "app__name", "user__username")
    list_filter = ("app", "user")
    raw_id_fields = ("user", "bank_account", "credit_card")
    autocomplete_fields = ["app"]
