from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _

from api.models import UUIDPrimaryKeyModel
from core.inventory.models import Inventory


class Customer(UUIDPrimaryKeyModel):
    """Model to store customer details."""

    name = models.CharField(max_length=255, db_index=True)
    email = models.EmailField(max_length=255, blank=True, null=True, unique=True)
    insta_id = models.CharField(max_length=255, blank=True, null=True, unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True, unique=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.phone or 'No Phone'}"

    def clean(self):
        """Ensure that at least one contact field is provided."""
        if not any([self.email, self.phone, self.insta_id]):
            raise ValidationError(_("At least one contact method (email, phone, or Instagram ID) must be provided."))

    class Meta:
        verbose_name = _("Customer")
        verbose_name_plural = _("Customers")
