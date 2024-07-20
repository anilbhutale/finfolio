# wallet/views.py
from rest_framework import generics
from .models import UPI
from .serializers import UPISerializer


class WalletListCreateView(generics.ListCreateAPIView):
    queryset = UPI.objects.all()
    serializer_class = UPISerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UPIRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UPI.objects.all()
    serializer_class = UPISerializer
