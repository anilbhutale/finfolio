# wallet/urls.py
from django.urls import path

from .views import WalletListCreateView, WalletRetrieveUpdateDestroyView

urlpatterns = [
    path("wallets/", WalletListCreateView.as_view(), name="wallet-list-create"),
    path("wallets/<int:pk>/", WalletRetrieveUpdateDestroyView.as_view(), name="wallet-retrieve-update-destroy"),
]
