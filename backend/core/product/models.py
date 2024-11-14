from django.db import models

from api.models import UUIDPrimaryKeyModel
from core.category.models import ProductCategory
from core.type.models import ProductType
from core.variant.models import ProductVariant


class Product(UUIDPrimaryKeyModel):
    name = models.CharField(max_length=200, db_index=True, verbose_name="Product Name")
    sku = models.CharField(max_length=20, unique=True, verbose_name="SKU")
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, verbose_name="Category")
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE, verbose_name="Product Type")
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, verbose_name="Variant")
    description = models.TextField(blank=True, null=True, verbose_name="Description")

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ["name"]

    def __str__(self):
        return self.name
