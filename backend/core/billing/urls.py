from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BillingCreateView

# router = DefaultRouter()
# router.register(r'billings', BillingViewSet)
# router.register(r'billing-items', BillingItemViewSet)

urlpatterns = [
    path("billing/", BillingCreateView.as_view(), name="create-billing"),
]
