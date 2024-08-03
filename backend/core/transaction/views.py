from django.contrib.contenttypes.models import ContentType
from rest_framework import generics
from rest_framework.exceptions import ValidationError

from .models import UPI, BankAccount, CreditCard, DebitCard, Transaction, Wallet
from .serializers import TransactionSerializer


class TransactionMethodMap:
    """
    Mapping between transaction_method and corresponding model class.
    """

    MAP = {
        "bank": BankAccount,
        "credit_card": CreditCard,
        "debit_card": DebitCard,
        "wallet": Wallet,
        "upi": UPI,
    }

    @classmethod
    def get_model_class(cls, transaction_method):
        model_class = cls.MAP.get(transaction_method)
        if not model_class:
            raise ValidationError("Invalid transaction method")
        return model_class


class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_create(self, serializer):
        transaction_method = self.request.data.get("transaction_method")
        transaction_source_id = self.request.data.get("transaction_source_id")

        model_class = TransactionMethodMap.get_model_class(transaction_method)
        content_type = ContentType.objects.get_for_model(model_class)

        # Ensure transaction_source_id is provided and valid
        if not transaction_source_id:
            raise ValidationError("transaction_source_id is required")

        try:
            model_class.objects.get(id=transaction_source_id)
        except model_class.DoesNotExist:
            raise ValidationError("Transaction source not found")

        # Save the transaction with the correct content type and ID
        serializer.save(user=self.request.user, transaction_source_type=content_type, transaction_source_id=transaction_source_id)

    def get_queryset(self):
        queryset = Transaction.objects.filter(user=self.request.user)
        transaction_type = self.request.query_params.get("transaction_type", None)
        if transaction_type:
            queryset = queryset.filter(transaction_type=transaction_type, user=self.request.user).select_related("invoice__category")
        return queryset


class TransactionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_update(self, serializer):
        transaction_method = self.request.data.get("transaction_method")
        transaction_source_id = self.request.data.get("transaction_source_id")

        model_class = TransactionMethodMap.get_model_class(transaction_method)
        content_type = ContentType.objects.get_for_model(model_class)

        if not transaction_source_id:
            raise ValidationError("transaction_source_id is required")

        try:
            model_class.objects.get(id=transaction_source_id)
        except model_class.DoesNotExist:
            raise ValidationError("Transaction source not found")

        # Update the transaction with the correct content type and ID
        serializer.save(user=self.request.user, transaction_source_type=content_type, transaction_source_id=transaction_source_id)

    def get_queryset(self):
        queryset = super().get_queryset()
        transaction_type = self.request.query_params.get("transaction_type", None)
        if transaction_type:
            queryset = queryset.filter(transaction_type=transaction_type, user=self.request.user)
        return queryset
