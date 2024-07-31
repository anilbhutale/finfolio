from rest_framework import viewsets

from .models import CreditCard
from .serializers import CreditCardSerializer


class CreditCardViewSet(viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer

    def get_queryset(self):
        # Get the current user from the request
        user = self.request.user

        # Filter the queryset to only include the bank account of the current user
        queryset = CreditCard.objects.filter(user=user)
        return queryset
