from django.db import models

from api.models import UUIDPrimaryKeyModel


class ProductCategory(UUIDPrimaryKeyModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
