# wallet/serializers.py
from rest_framework import serializers
from .models import UPI


class UPISerializer(serializers.ModelSerializer):
    class Meta:
        model = UPI
        fields = "__all__"
