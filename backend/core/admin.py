from django import forms
from django.contrib import admin
from django.urls import path, reverse
from django.utils.safestring import mark_safe
from django.shortcuts import render
from django.http import HttpResponseRedirect
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
from django.shortcuts import redirect
from django.template.response import TemplateResponse

# Custom Admin Site
class MyAdminSite(UnfoldAdminSite):
    title = "Custom Title"  # required: custom page header title
    site_header = "My WiFi Fashin Admin"
    site_title = "My WiFi Fashin Admin"
    index_title = "Welcome to the WiFi Fashion Admin"
    # def index(self, request, extra_context=None):
    #     # Add custom context if needed
    #     extra_context = extra_context or {}
    #     extra_context['custom_message'] = "Welcome to WiFi Fashion Admin Dashboard!"
    #     return TemplateResponse(request, "admin/custom_index.html", extra_context)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path("toggle_sidebar/", toggle_sidebar, name="toggle_sidebar"),
        ]
        return custom_urls + urls


# Instantiate custom admin site
my_admin_site = MyAdminSite(name="myadmin")

# Inline Admin for Inventory
class InventoryInline(TabularInline):
    model = Inventory
    fields = ["color", "size", "stock", "price", "sprice", "last_updated", "qr_code"]
    readonly_fields = ["last_updated", "qr_code"]
    extra = 1
    classes = ["collapse"]

# Product Admin
class ProductAdmin(ModelAdmin):
    list_display = ["name", "sku", "category", "product_type"]
    search_fields = ["name", "sku"]
    list_filter = ["category", "product_type"]
    inlines = [InventoryInline]
    def response_change(self, request, obj):
        # After saving the product, redirect to the print all QR codes page
        if "_save" in request.POST:
            # Get all inventory items for the product
            inventory_items = obj.inventory_items.all()
            if inventory_items.exists():
                # Redirect to the print all QR codes page
                return redirect(reverse('print_all_qr_codes', args=[obj.pk]))
        return redirect(reverse('print_all_qr_codes', args=[obj.pk]))
        # If you want to go back to the change form, use the default response
        # return super().response_change(request, obj)
my_admin_site.register(Product, ProductAdmin)

# Billing Item Inline
class BillingItemForm(forms.ModelForm):
    class Meta:
        model = BillingItem
        fields = ("inventory_item", "quantity", "price", "total_price")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["inventory_item"].label = "Product Size Color Selling Price"


class BillingItemInline(TabularInline):
    model = BillingItem
    extra = 0
    fields = ["inventory_item", "quantity", "price", "total_price"]
    form = BillingItemForm

# Helper Function for Receipt Context
def get_receipt_context(billing):
    return {
        "billing": billing,
        "billing_items": billing.billing_items.all(),
        "shop_name": "Wifi Fashion",
        "shop_address": "Hanegaon, Degloor Road",
        "shop_phone": "9030418452",
    }

# Billing Admin
class BillingAdmin(ModelAdmin):
    list_display = ('billing_number', 'customer', 'total_amount', 'discount', 'payment_mode', 'date')
    search_fields = ('billing_number', 'customer__name')
    search_fields = ["customer__name", "id"]
    inlines = [BillingItemInline]
    date_hierarchy = "date"
    actions = ["print_receipt"]

    def print_receipt(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, "Please select exactly one billing record to print.", level="error")
            return HttpResponseRedirect(request.get_full_path())

        billing = queryset.first()
        context = get_receipt_context(billing)
        return render(request, "billing/receipt.html", context)

    print_receipt.short_description = "Print receipt for selected billing"

    def get_changeform_template(self, request, obj=None):
        return "billing/changeform.html"

    def response_change(self, request, obj):
        if "_continue" in request.POST:
            return super().response_change(request, obj)
        return HttpResponseRedirect(reverse("core_billing_print_receipt", args=[obj.pk]))

my_admin_site.register(Billing, BillingAdmin)

# Register Other Models
class ColorAdmin(ModelAdmin):
    list_display = ["name", "hex_code"]

class ProductCategoryAdmin(ModelAdmin):
    list_display = ["name"]

class SizeAdmin(ModelAdmin):
    list_display = ["size"]
    search_fields = ["size"]

class ProductTypeAdmin(ModelAdmin):
    list_display = ["name"]

class ProductVariantAdmin(ModelAdmin):
    list_display = ["name", "description"]

class InventoryAdmin(ModelAdmin):
    list_display = ["product", "color", "size", "stock", "price", "sprice", "last_updated", "qr_code"]
    readonly_fields = ["last_updated", "qr_code"]

class CustomerAdmin(ModelAdmin):
    list_display = ["name", "email", "phone", "address"]

my_admin_site.register(Color, ColorAdmin)
my_admin_site.register(ProductCategory, ProductCategoryAdmin)
my_admin_site.register(Size, SizeAdmin)
my_admin_site.register(ProductType, ProductTypeAdmin)
my_admin_site.register(ProductVariant, ProductVariantAdmin)
my_admin_site.register(Inventory, InventoryAdmin)
my_admin_site.register(Customer, CustomerAdmin)
