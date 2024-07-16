from django.contrib import admin
from .models import Loan
from unfold.admin import ModelAdmin


@admin.register(Loan)
class CreditCardAdmin(ModelAdmin):
    list_display = ("user", "loan_type", "user", "created_at", "updated_at")
    list_filter = ("user",)
    search_fields = ("user", "user__username", "user__email")
