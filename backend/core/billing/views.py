# core/billing/views.py

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
