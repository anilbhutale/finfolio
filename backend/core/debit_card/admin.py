from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import DebitCard


@admin.register(DebitCard)
class CreditCardAdmin(ModelAdmin):
    list_display = ("name", "card_number", "expiry_date", "user", "created_at", "updated_at")
    list_filter = ("user",)
    search_fields = ("card_number", "user__username", "user__email")
