# wallet/urls.py
from django.urls import path

from .views import UpiAppListCreateView, UPIAppRetrieveUpdateDestroyView, UpiListCreateView, UPIRetrieveUpdateDestroyView

urlpatterns = [
    path("upi/", UpiListCreateView.as_view(), name="wallet-list-create"),
    path("upi/<int:pk>/", UPIRetrieveUpdateDestroyView.as_view(), name="wallet-retrieve-update-destroy"),
    path("upi-app/", UpiAppListCreateView.as_view(), name="wallet-list-create"),
    path("upi-app/<int:pk>/", UPIAppRetrieveUpdateDestroyView.as_view(), name="wallet-retrieve-update-destroy"),
]
