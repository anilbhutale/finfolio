from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics

from .models import Transaction
from .serializers import TransactionSerializer


class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    transaction_type_param = openapi.Parameter(
        "transaction_type", openapi.IN_QUERY, description="Filter by transaction type (credit or debit)", type=openapi.TYPE_STRING
    )

    @swagger_auto_schema(manual_parameters=[transaction_type_param])
    def get_queryset(self):
        queryset = super().get_queryset()
        transaction_type = self.request.query_params.get("transaction_type", None)
        if transaction_type:
            queryset = queryset.filter(transaction_type=transaction_type)
        return queryset

    def perform_create(self, serializer):
        # Set the user for the created transaction
        serializer.save(user=self.request.user)


class TransactionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_update(self, serializer):
        # Set the user for the updated transaction
        serializer.save(user=self.request.user)
