from django.conf import settings
from django.db import models, transaction
from django.utils import timezone

from api.models import UUIDPrimaryKeyModel
from core.customer.models import Customer
from core.inventory.models import Inventory


class Billing(UUIDPrimaryKeyModel):
    """
    Model to represent a customer bill, including total amount and customer reference.
    """

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="billings")
    date = models.DateTimeField(default=timezone.now)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Billing #{self.id} - {self.customer.name} - {self.total_amount}"

    def save(self, *args, **kwargs):
        """
        Override save method to calculate total amount from related BillingItems.
        """
        # Use transaction.atomic to ensure atomic operation
        with transaction.atomic():
            # Calculate total amount from related BillingItems
            # self.total_amount = sum(item.total_price for item in self.billing_items.all())
            super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Billing"
        verbose_name_plural = "Billings"


class BillingItem(UUIDPrimaryKeyModel):
    billing = models.ForeignKey(Billing, on_delete=models.CASCADE, related_name="billing_items")
    inventory_item = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name="billing_items")
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        # Only calculate total_amount if the Billing instance has been saved
        if not self.pk:  # If the instance doesn't have a primary key yet
            super().save(*args, **kwargs)  # Save to generate the primary key

        # Now you can safely access related items
        # self.total_amount = sum(item.total_price for item in self.billing_items.all())
        super().save(*args, **kwargs)