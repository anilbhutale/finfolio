from django.contrib.admin import AdminSite
from django.contrib import admin
from core.category.models import ProductCategory
from core.color.models import Color
from core.customer.models import Customer
from core.inventory.models import Inventory
from core.product.models import Product
from core.size.models import Size
from core.type.models import ProductType
from core.variant.models import ProductVariant
from core.views import toggle_sidebar
from django.urls import path
from unfold.admin import ModelAdmin
from unfold.admin import TabularInline

class MyAdminSite(AdminSite):
    site_header = "My Custom Admin Dashboard"
    site_title = "My Custom Admin Panel"
    index_title = "Welcome to the Custom Admin Panel"

    # Override the get_urls method to add custom URLs
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('toggle_sidebar/', toggle_sidebar, name='toggle_sidebar'),
        ]
        return custom_urls + urls

# Instantiate your custom admin site
my_admin_site = MyAdminSite(name="myadmin")

# Create a custom admin class for ProductCategory
class ProductCategoryAdmin(ModelAdmin):
    list_display = ('name',)

# Register ProductCategory model with your custom admin site
my_admin_site.register(ProductCategory, ProductCategoryAdmin)

class ColorAdmin(ModelAdmin):
    list_display = ('name', 'hex_code')

# Register ProductCategory model with your custom admin site
my_admin_site.register(Color, ColorAdmin)

class InventoryInline(TabularInline):  # Use admin.TabularInline here
    model = Inventory
    fields = ['color', 'size', 'stock', 'price', 'sprice', 'last_updated']
    readonly_fields = ['last_updated']
    extra = 1  # Allows adding additional inventory entries for colors and sizes
    classes = ['collapse']  # Optional: adds collapsing to keep the interface clean

class ProductAdmin(ModelAdmin):
    list_display = ['name']
    search_fields = ['name']
    inlines = [InventoryInline]  # Use the corrected InventoryInline here

my_admin_site.register(Product, ProductAdmin)


class SizeAdmin(ModelAdmin):
    list_display = ['size']
    search_fields = ['size']

my_admin_site.register(Size, SizeAdmin)


class ProductTypeAdmin(ModelAdmin):
    list_display = ('name',)

my_admin_site.register(ProductType, ProductTypeAdmin)
class ProductVariantAdmin(ModelAdmin):
    list_display = ('name', 'description')
my_admin_site.register(ProductVariant, ProductVariantAdmin)



class InventoryAdmin(ModelAdmin):
    list_display = ['product', 'color', 'size', 'stock', 'price', 'sprice', 'last_updated', 'qr_code']
    readonly_fields = ['last_updated', 'qr_code']  # Make the QR code readonly
    search_fields = ['product__name', 'color__name', 'size__size']
    
    # Optionally, you can also create a custom display for the QR code
    def qr_code_display(self, obj):
        if obj.qr_code:
            return f'<img src="{obj.qr_code.url}" width="100" height="100" />'
        return "No QR Code"
    
    qr_code_display.allow_tags = True
    qr_code_display.short_description = 'QR Code'
    
    # Adding it to the list_display to show in the admin
    list_display = ['product', 'color', 'size', 'stock', 'price', 'last_updated', 'qr_code_display']

my_admin_site.register(Inventory, InventoryAdmin)
class CustomerAdmin(ModelAdmin):
    list_display = ('name', 'email', 'phone', 'address')

my_admin_site.register(Customer, CustomerAdmin)