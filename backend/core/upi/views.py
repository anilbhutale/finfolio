# wallet/views.py
from rest_framework import generics

from .models import UPI, UPIApp
from .serializers import UPIAppSerializer, UPISerializer


class UpiListCreateView(generics.ListCreateAPIView):
    queryset = UPI.objects.all()
    serializer_class = UPISerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Get the current user from the request
        user = self.request.user
        # Filter the queryset to only include the bank account of the current user
        queryset = UPI.objects.filter(user=user)
        return queryset


class UPIRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UPI.objects.all()
    serializer_class = UPISerializer


class UpiAppListCreateView(generics.ListCreateAPIView):
    queryset = UPIApp.objects.all()
    serializer_class = UPIAppSerializer


class UPIAppRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UPIApp.objects.all()
    serializer_class = UPIAppSerializer
