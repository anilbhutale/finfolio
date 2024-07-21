# wallet/urls.py
from django.urls import path

from .views import UPIRetrieveUpdateDestroyView, UPISerializer

urlpatterns = [
    path("upi/", UPISerializer.as_view(), name="wallet-list-create"),
    path("upi/<int:pk>/", UPIRetrieveUpdateDestroyView.as_view(), name="wallet-retrieve-update-destroy"),
]
