# core/billing/views.py
from django.shortcuts import render, get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Billing
from .serializers import BillingSerializer


class BillingCreateView(APIView):
    @swagger_auto_schema(request_body=BillingSerializer)
    def post(self, request, *args, **kwargs):
        # Validate the incoming data using the BillingSerializer
        serializer = BillingSerializer(data=request.data)

        if serializer.is_valid():
            # Create the billing and its associated items
            billing = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def print_receipt(request, billing_id):
    # Retrieve the Billing object by ID
    billing = get_object_or_404(Billing, id=billing_id)
    
    # Get the associated BillingItems
    billing_items = billing.billing_items.all()  # or billing.billingitem_set.all() based on your relation

    # Pass the data to the template for rendering the receipt
    context = {
        'billing': billing,
        'billing_items': billing_items,
        'shop_name': "WiFi Fashion",
        'shop_address': "Hanegaon Degloor Road",
        'shop_phone': "+91-9030418452",
    }
    
    # Render the receipt template
    return render(request, "billing/receipt.html", context)
