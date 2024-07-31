# wallet/views.py
from rest_framework import generics

from .models import Wallet
from .serializers import WalletSerializer


class WalletListCreateView(generics.ListCreateAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Get the current user from the request
        user = self.request.user

        # Filter the queryset to only include the bank account of the current user
        queryset = Wallet.objects.filter(user=user)
        return queryset


class WalletRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
