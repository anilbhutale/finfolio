from rest_framework import serializers
from core.invoice.serializers import InvoiceSerializer


from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    invoice = InvoiceSerializer()

    class Meta:
        model = Transaction
        fields = "__all__"

    def validate(self, data):
        # Ensure transaction_source_type is included
        if "transaction_source_type" not in data:
            raise serializers.ValidationError({"transaction_source_type": "This field is required."})
        return data
