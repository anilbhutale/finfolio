from django.db import models
from core.category.models import ProductCategory
from core.type.models import ProductType
from core.variant.models import ProductVariant
from django.apps import apps
from api.models import UUIDPrimaryKeyModel
class Product(UUIDPrimaryKeyModel):
    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=20)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name