from django.contrib import admin
from .models import Invoice, InvoiceItem
from unfold.admin import ModelAdmin


class InvoiceItemInline(admin.TabularInline):
    model = InvoiceItem
    extra = 1


@admin.register(Invoice)
class InvoiceAdmin(ModelAdmin):
    inlines = [InvoiceItemInline]


admin.site.register(InvoiceItem)
