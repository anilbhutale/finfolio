from rest_framework import serializers

from .models import Billing, BillingItem


class BillingItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingItem
        fields = ["inventory_item", "quantity", "price", "total_price"]


class BillingSerializer(serializers.ModelSerializer):
    billing_items = BillingItemSerializer(many=True)

    class Meta:
        model = Billing
        fields = ["customer", "date", "total_amount", "billing_items"]

    def create(self, validated_data):
        billing_items_data = validated_data.pop("billing_items")
        billing = Billing.objects.create(**validated_data)
        for item_data in billing_items_data:
            BillingItem.objects.create(billing=billing, **item_data)
        return billing
