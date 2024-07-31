from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Invoice, InvoiceItem


class InvoiceItemInline(admin.TabularInline):
    model = InvoiceItem
    extra = 1


@admin.register(Invoice)
class InvoiceAdmin(ModelAdmin):
    inlines = [InvoiceItemInline]
    list_display = [field.name for field in Invoice._meta.fields]
    search_fields = [field.name for field in Invoice._meta.fields]


@admin.register(InvoiceItem)
class InvoiceItemAdmin(ModelAdmin):
    model = InvoiceItem
    list_display = [field.name for field in InvoiceItem._meta.fields]
    search_fields = [field.name for field in InvoiceItem._meta.fields]
