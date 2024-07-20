from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from core.bank_account.models import BankAccount
from core.credit_card.models import CreditCard
from core.debit_card.models import DebitCard
from core.wallet.models import Wallet
from core.upi.models import UPI
from core.invoice.models import Invoice
from django.conf import settings
from django.utils import timezone


class Transaction(models.Model):
    TRANSACTION_METHODS = [
        ("bank", "Bank"),
        ("credit_card", "Credit Card"),
        ("debit_card", "Debit Card"),
        ("wallet", "Wallet"),
        ("upi", "UPI"),
    ]

    TRANSACTION_TYPES = [
        ("debit", "Debit"),
        ("credit", "Credit"),
    ]

    title = models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    transaction_method = models.CharField(max_length=20, choices=TRANSACTION_METHODS)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateField()
    description = models.TextField()
    transaction_source_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    transaction_source_id = models.PositiveIntegerField()
    transaction_source = GenericForeignKey("transaction_source_type", "transaction_source_id")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.transaction_type} - {self.amount}"

    def save(self, *args, **kwargs):
        # Handle balance update logic
        if self.pk:  # If updating an existing transaction
            original_transaction = Transaction.objects.get(pk=self.pk)
            self.reverse_balance(original_transaction)

        super().save(*args, **kwargs)
        self.update_balance()

    def reverse_balance(self, original_transaction):
        if original_transaction.transaction_source:
            if isinstance(original_transaction.transaction_source, BankAccount):
                self.adjust_bank_balance(original_transaction, reverse=True)
            elif isinstance(original_transaction.transaction_source, CreditCard):
                self.adjust_credit_card_balance(original_transaction, reverse=True)
            elif isinstance(original_transaction.transaction_source, DebitCard):
                self.adjust_debit_card_balance(original_transaction, reverse=True)
            elif isinstance(original_transaction.transaction_source, Wallet):
                self.adjust_wallet_balance(original_transaction, reverse=True)
            elif isinstance(original_transaction.transaction_source, UPI):
                self.adjust_upi_balance(original_transaction, reverse=True)

    def update_balance(self):
        if self.transaction_source:
            if isinstance(self.transaction_source, BankAccount):
                self.adjust_bank_balance()
            elif isinstance(self.transaction_source, CreditCard):
                self.adjust_credit_card_balance()
            elif isinstance(self.transaction_source, DebitCard):
                self.adjust_debit_card_balance()
            elif isinstance(self.transaction_source, Wallet):
                self.adjust_wallet_balance()
            elif isinstance(self.transaction_source, UPI):
                self.adjust_upi_balance()

    def adjust_bank_balance(self, transaction=None, reverse=False):
        if transaction:
            amount = -transaction.amount if transaction.transaction_type == "credit" else transaction.amount
        else:
            amount = self.amount if self.transaction_type == "credit" else -self.amount

        bank = BankAccount.objects.get(id=self.transaction_source_id)
        bank.balance += amount
        bank.save()

    def adjust_credit_card_balance(self, transaction=None, reverse=False):
        if transaction:
            amount = -transaction.amount if transaction.transaction_type == "credit" else transaction.amount
        else:
            amount = self.amount if self.transaction_type == "credit" else -self.amount

        credit_card = CreditCard.objects.get(id=self.transaction_source_id)
        credit_card.current_balance += amount
        credit_card.save()

    def adjust_debit_card_balance(self, transaction=None, reverse=False):
        if transaction:
            amount = -transaction.amount if transaction.transaction_type == "credit" else transaction.amount
        else:
            amount = self.amount if self.transaction_type == "credit" else -self.amount

        debit_card = DebitCard.objects.get(id=self.transaction_source_id)
        bank_account = debit_card.account
        bank_account.balance += amount
        bank_account.save()

    def adjust_wallet_balance(self, transaction=None, reverse=False):
        if transaction:
            amount = -transaction.amount if transaction.transaction_type == "credit" else transaction.amount
        else:
            amount = self.amount if self.transaction_type == "credit" else -self.amount

        wallet = Wallet.objects.get(id=self.transaction_source_id)
        wallet.current_balance += amount
        wallet.save()

    def adjust_upi_balance(self, transaction=None, reverse=False):
        # Implement UPI-specific balance adjustment if necessary
        pass
