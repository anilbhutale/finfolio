from django.contrib import admin
from django.contrib.contenttypes.admin import GenericStackedInline
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from django.utils.html import format_html
from unfold.admin import ModelAdmin

from core.bank_account.models import BankAccount
from core.credit_card.models import CreditCard
from core.debit_card.models import DebitCard
from core.upi.models import UPI
from core.wallet.models import Wallet

from .models import Transaction


class CreditCardInline(admin.StackedInline):
    model = CreditCard
    can_delete = False
    verbose_name_plural = "Credit Card"


class BankAccountInline(admin.StackedInline):
    model = BankAccount
    can_delete = False
    verbose_name_plural = "Bank Account"


class WalletInline(admin.StackedInline):
    model = Wallet
    can_delete = False
    verbose_name_plural = "Wallet"


class UPIInline(admin.StackedInline):
    model = UPI
    can_delete = False
    verbose_name_plural = "UPI"


class TransactionAdmin(ModelAdmin):
    list_display = ("title", "amount", "transaction_type", "transaction_method", "transaction_date", "transaction_source_display", "created_at")
    list_filter = ("transaction_type", "transaction_method", "transaction_date", "user")
    search_fields = ("title", "description")

    def transaction_source_display(self, obj):
        """Return detailed representation of the transaction source."""
        if obj.transaction_source:
            if isinstance(obj.transaction_source, CreditCard):
                return format_html(
                    '<a href="{}">{}</a>', reverse("admin:credit_card_creditcard_change", args=[obj.transaction_source.id]), obj.transaction_source
                )
            elif isinstance(obj.transaction_source, BankAccount):
                return format_html(
                    '<a href="{}">{}</a>', reverse("admin:bank_account_bankaccount_change", args=[obj.transaction_source.id]), obj.transaction_source
                )
            elif isinstance(obj.transaction_source, Wallet):
                return format_html(
                    '<a href="{}">{}</a>', reverse("admin:wallet_wallet_change", args=[obj.transaction_source.id]), obj.transaction_source
                )
            elif isinstance(obj.transaction_source, UPI):
                return format_html('<a href="{}">{}</a>', reverse("admin:upi_upi_change", args=[obj.transaction_source.id]), obj.transaction_source)
            else:
                return str(obj.transaction_source)
        return "None"

    transaction_source_display.short_description = "Transaction Source"

    def change_view(self, request, object_id, form_url="", extra_context=None):
        """Customize the change view to include additional context."""
        extra_context = extra_context or {}
        transaction = self.get_object(request, object_id)
        if transaction and transaction.transaction_source:
            if isinstance(transaction.transaction_source, CreditCard):
                extra_context["transaction_source_details"] = format_html("<h3>Credit Card Details:</h3><p>{}</p>", transaction.transaction_source)
            elif isinstance(transaction.transaction_source, BankAccount):
                extra_context["transaction_source_details"] = format_html("<h3>Bank Account Details:</h3><p>{}</p>", transaction.transaction_source)
            elif isinstance(transaction.transaction_source, Wallet):
                extra_context["transaction_source_details"] = format_html("<h3>Wallet Details:</h3><p>{}</p>", transaction.transaction_source)
            elif isinstance(transaction.transaction_source, UPI):
                extra_context["transaction_source_details"] = format_html("<h3>UPI Details:</h3><p>{}</p>", transaction.transaction_source)
            else:
                extra_context["transaction_source_details"] = "No details available"
        return super().change_view(request, object_id, form_url, extra_context=extra_context)


admin.site.register(Transaction, TransactionAdmin)
