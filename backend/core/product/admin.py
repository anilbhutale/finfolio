from django.contrib import admin
from unfold.admin import ModelAdmin  # Keep using ModelAdmin for ProductAdmin
from .models import Product
from core.inventory.models import Inventory
from unfold.admin import StackedInline, TabularInline

class InventoryInline(TabularInline):  # Use admin.TabularInline here
    model = Inventory
    fields = ['color', 'size', 'stock', 'price', 'sprice', 'last_updated']
    readonly_fields = ['last_updated']
    extra = 1  # Allows adding additional inventory entries for colors and sizes
    classes = ['collapse']  # Optional: adds collapsing to keep the interface clean

@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = ['name']
    search_fields = ['name']
    inlines = [InventoryInline]  # Use the corrected InventoryInline here
