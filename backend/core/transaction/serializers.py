from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from core.invoice.serializers import InvoiceSerializer

from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    invoice = InvoiceSerializer()
    transaction_source = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = "__all__"
        extra_kwargs = {"transaction_source_type": {"write_only": True}, "transaction_source_id": {"write_only": True}}

    def validate(self, data):
        # Ensure transaction_source_type is included
        if "transaction_source_type" not in data:
            raise serializers.ValidationError({"transaction_source_type": "This field is required."})
        return data

    def get_transaction_source(self, obj):
        # Get the model class for the transaction source
        content_type = ContentType.objects.get_for_id(obj.transaction_source_type.id)

        model_class = content_type.model_class()

        if model_class:
            test = model_class.objects.filter(id=obj.transaction_source_id).first()
            # print(test.name)
            # return test.name ? test
            if hasattr(test, "name"):
                return test.name
            elif hasattr(test, "upi_id"):
                return test.upi_id
            elif hasattr(test, "bank"):
                return test.bank
        return None
