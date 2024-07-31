# wallet/serializers.py
from rest_framework import serializers

from .models import UPI, UPIApp


class UPISerializer(serializers.ModelSerializer):
    class Meta:
        model = UPI
        fields = "__all__"


class UPIAppSerializer(serializers.ModelSerializer):
    upi_accounts = UPISerializer(many=True, read_only=True)

    class Meta:
        model = UPIApp
        fields = ["id", "name", "upi_accounts"]
