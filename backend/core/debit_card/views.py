from rest_framework import generics

from .models import DebitCard
from .serializers import DebitCardSerializer


class DebitCardListCreateView(generics.ListCreateAPIView):
    queryset = DebitCard.objects.all()
    serializer_class = DebitCardSerializer

    def get_queryset(self):
        # Get the current user from the request
        user = self.request.user

        # Filter the queryset to only include the bank account of the current user
        queryset = DebitCard.objects.filter(user=user)
        return queryset


class DebitCardRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DebitCard.objects.all()
    serializer_class = DebitCardSerializer
