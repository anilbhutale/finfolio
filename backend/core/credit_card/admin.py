from django.contrib import admin
from .models import CreditCard
from unfold.admin import ModelAdmin


@admin.register(CreditCard)
class CreditCardAdmin(ModelAdmin):
    list_display = ("card_number", "expiry_date", "credit_limit", "current_balance", "user", "created_at", "updated_at")
    list_filter = ("user",)
    search_fields = ("card_number", "user__username", "user__email")
