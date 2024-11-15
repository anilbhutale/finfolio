from django.apps import AppConfig


class BillingConfig(AppConfig):
    name = "core.billing"

    def ready(self):
        import core.billing.signals