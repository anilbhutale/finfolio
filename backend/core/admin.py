from django import forms
from django.contrib import admin
from django.contrib.admin import AdminSite
from django.urls import path
from django.utils.safestring import mark_safe
from unfold.admin import ModelAdmin, TabularInline
from unfold.sites import UnfoldAdminSite

from core.billing.models import Billing, BillingItem
from core.category.models import ProductCategory
from core.color.models import Color
from core.customer.models import Customer
from core.inventory.models import Inventory
from core.product.models import Product
from core.size.models import Size
from core.type.models import ProductType
from core.variant.models import ProductVariant
from core.views import toggle_sidebar


class MyAdminSite(UnfoldAdminSite):
    site_header = "My Custom Admin Dashboard"
    site_title = "My Custom Admin Panel"
    index_title = "Welcome to the Custom Admin Panel"

    # Override the get_urls method to add custom URLs
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path("toggle_sidebar/", toggle_sidebar, name="toggle_sidebar"),
        ]
        return custom_urls + urls


# Instantiate your custom admin site
my_admin_site = MyAdminSite(name="myadmin")


# Create a custom admin class for ProductCategory
class ProductCategoryAdmin(ModelAdmin):
    list_display = ("name",)


# Register ProductCategory model with your custom admin site
my_admin_site.register(ProductCategory, ProductCategoryAdmin)


class ColorAdmin(ModelAdmin):
    list_display = ("name", "hex_code")


# Register ProductCategory model with your custom admin site
my_admin_site.register(Color, ColorAdmin)


class InventoryInline(TabularInline):  # Use admin.TabularInline here
    model = Inventory
    fields = ["color", "size", "stock", "price", "sprice", "last_updated", "qr_code"]
    readonly_fields = ["last_updated", "qr_code"]
    extra = 1
    classes = ["collapse"]
    verbose_name = "Inventory Item"
    verbose_name_plural = "Inventory Items"
    show_change_link = True


class ProductAdmin(ModelAdmin):
    list_display = ["name", "sku", "category", "product_type"]
    search_fields = ["name", "sku"]
    list_filter = ["category", "product_type"]
    inlines = [InventoryInline]  # Use the corrected InventoryInline here


my_admin_site.register(Product, ProductAdmin)


class SizeAdmin(ModelAdmin):
    list_display = ["size"]
    search_fields = ["size"]


my_admin_site.register(Size, SizeAdmin)


class ProductTypeAdmin(ModelAdmin):
    list_display = ("name",)


my_admin_site.register(ProductType, ProductTypeAdmin)


class ProductVariantAdmin(ModelAdmin):
    list_display = ("name", "description")


my_admin_site.register(ProductVariant, ProductVariantAdmin)


class InventoryAdmin(ModelAdmin):
    list_display = ["product", "color", "size", "stock", "price", "sprice", "last_updated", "qr_code"]
    readonly_fields = ["last_updated", "qr_code"]  # Make the QR code readonly
    search_fields = ["product__name", "color__name", "size__size"]

    # Optionally, you can also create a custom display for the QR code
    def qr_code_display(self, obj):
        if obj.qr_code:
            return f'<img src="{obj.qr_code.url}" width="100" height="100" />'
        return "No QR Code"

    qr_code_display.allow_tags = True
    qr_code_display.short_description = "QR Code"

    # Adding it to the list_display to show in the admin
    list_display = ["product", "color", "size", "stock", "price", "last_updated", "qr_code_display"]


my_admin_site.register(Inventory, InventoryAdmin)


class CustomerAdmin(ModelAdmin):
    list_display = ("name", "email", "phone", "address")


my_admin_site.register(Customer, CustomerAdmin)


class BillingItemInline(TabularInline):
    """
    Inline admin for BillingItem to allow editing items directly within the Billing admin.
    """

    model = BillingItem
    extra = 0
    readonly_fields = ("total_price", "qr_code_scanner")
    fields = ("inventory_item", "quantity", "price", "total_price", "qr_code_scanner")

    def qr_code_scanner(self, obj):
        # Add a QR scanner button and display it in the inline form
        return mark_safe('<button type="button" class="btn btn-info" onclick="startQRScanner(event)">Scan QR Code</button>')

    qr_code_scanner.short_description = "QR Code Scanner"


class BillingItemForm(forms.ModelForm):
    class Meta:
        model = BillingItem
        fields = ("inventory_item", "quantity", "price", "total_price")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Change the label for the inventory_item field
        self.fields["inventory_item"].label = "Product Size Color Selling Price"


class BillingItemInline(TabularInline):
    model = BillingItem
    extra = 0
    readonly_fields = ("qr_code_scanner",)
    fields = ("inventory_item", "quantity", "price", "total_price", "qr_code_scanner")
    form = BillingItemForm

    def qr_code_scanner(self, obj):
        # Add a QR scanner button and display it in the inline form
        return mark_safe('<button type="button" class="btn btn-info" onclick="startQRScanner(event)">Scan QR Code</button>')

    qr_code_scanner.short_description = "QR Code Scanner"

    def save_model(self, request, obj, form, change):
        """
        Save BillingItem after the Billing object has been saved.
        """
        # Ensure that the parent Billing is saved first
        obj.billing.save()
        super().save_model(request, obj, form, change)

class BillingAdmin(ModelAdmin):
    """
    Admin for Billing model with inline BillingItems, list display, and readonly total amount.
    """

    list_display = ("id", "customer", "date", "total_amount")
    search_fields = ("customer__name", "id")
    # readonly_fields = ("total_amount",)
    inlines = [BillingItemInline]
    date_hierarchy = "date"

    def get_changeform_template(self, request, obj=None):
        """
        Override to return the custom change form template.
        This is optional but allows for additional control.
        """
        return "admin/billing/changeform.html"

    def save_model(self, request, obj, form, change):
        """
        Ensure total_amount is recalculated on each save.
        """
        obj.save()  # Save the Billing instance first to generate its primary key
        # total_amount = sum(billing_item.total_price for billing_item in obj.billingitem_set.all())  # Sum of related BillingItems' total prices
        # obj.total_amount = total_amount  # Assign the total amount
        # obj.save()  # Save again to persist the updated total_amount


my_admin_site.register(Billing, BillingAdmin)
