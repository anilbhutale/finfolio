from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from core.inventory.models import Inventory
from api.models import UUIDPrimaryKeyModel

class Customer(UUIDPrimaryKeyModel):
    """Model to store customer details."""
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, blank=True, null=True)
    insta_id = models.EmailField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.phone or 'No Phone'}"