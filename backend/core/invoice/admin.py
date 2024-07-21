from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Invoice, InvoiceItem


class InvoiceItemInline(admin.TabularInline):
    model = InvoiceItem
    extra = 1


@admin.register(Invoice)
class InvoiceAdmin(ModelAdmin):
    inlines = [InvoiceItemInline]


admin.site.register(InvoiceItem)
