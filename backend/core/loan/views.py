from rest_framework import generics

from .models import Loan
from .serializers import LoanSerializer


class LoanListCreateView(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

    def get_queryset(self):
        # Get the current user from the request
        user = self.request.user

        # Filter the queryset to only include the bank account of the current user
        queryset = Loan.objects.filter(user=user)
        return queryset


class LoanRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
