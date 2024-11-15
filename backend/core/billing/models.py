from django.db import models
from django.utils import timezone
from api.models import UUIDPrimaryKeyModel
from core.customer.models import Customer
from core.inventory.models import Inventory
from django.db.models import Max

class Billing(UUIDPrimaryKeyModel):
    """
    Represents a customer bill, including total amount, customer reference, and payment method.
    """
    # Payment Mode choices
    CASH = 'cash'
    ONLINE = 'online'
    BOTH = 'both'

    PAYMENT_METHOD_CHOICES = [
        (CASH, 'Cash'),
        (ONLINE, 'Online'),
        (BOTH, 'Both'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="billings")
    date = models.DateTimeField(default=timezone.now)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    billing_number = models.CharField(max_length=20, unique=True, blank=True)
    payment_mode = models.CharField(
        max_length=10,
        choices=PAYMENT_METHOD_CHOICES,
        default=CASH,
        help_text="Select the payment mode for the billing",
    )

    def __str__(self):
        return f"Billing #{self.pk} - {self.customer.name} - {self.total_amount} - {self.get_payment_mode_display()}"
    def save(self, *args, **kwargs):
        """
        Override save method to generate custom billing number (e.g. WIFI-0000001).
        """
        if not self.billing_number:  # If no billing number, generate it
            last_billing = Billing.objects.aggregate(last_number=Max('billing_number'))['last_number']
            if last_billing:
                # Extract the numeric part and increment it
                last_number = int(last_billing.split('-')[1])
                new_number = f"WIFI-{str(last_number + 1).zfill(7)}"
            else:
                # If this is the first billing, start with WIFI-0000001
                new_number = "WIFI-0000001"
            self.billing_number = new_number
        
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Billing"
        verbose_name_plural = "Billings"



class BillingItem(UUIDPrimaryKeyModel):
    """
    Represents an item within a bill, including reference to inventory and its quantity, price, and total.
    """
    billing = models.ForeignKey(Billing, on_delete=models.CASCADE, related_name="billing_items")
    inventory_item = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name="billing_items")
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"BillingItem #{self.pk} - {self.billing.customer.name} - {self.total_price}"

    def save(self, *args, **kwargs):
        """
        Override the save method to calculate the total_price before saving.
        """
        # Calculate the total price based on quantity and price
        self.total_price = self.quantity * self.price
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Billing Item"
        verbose_name_plural = "Billing Items"
