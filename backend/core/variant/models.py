from django.apps import apps
from django.db import models

from api.models import UUIDPrimaryKeyModel


class ProductVariant(UUIDPrimaryKeyModel):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
