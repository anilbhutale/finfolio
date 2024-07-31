# models.py
from django.conf import settings
from django.db import models

from core.bank_account.models import BankAccount
from core.credit_card.models import CreditCard


class UPIApp(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


# models.py
class UPI(models.Model):
    upi_id = models.CharField(max_length=50, unique=True)
    app = models.ForeignKey(UPIApp, on_delete=models.CASCADE, related_name="upi_accounts")
    bank_account = models.ForeignKey(BankAccount, on_delete=models.CASCADE, related_name="upi_accounts", null=True, blank=True)
    credit_card = models.ForeignKey(CreditCard, on_delete=models.CASCADE, related_name="upi_credit_cards", null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.app.name} - {self.upi_id}"
