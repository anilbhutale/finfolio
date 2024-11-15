from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Billing

@receiver(post_save, sender=Billing)
def billing_saved(sender, instance, created, **kwargs):
    if created:
        # Logic for newly created billing instance
        print(f"New Billing created with ID: {instance.pk}")
    else:
        # Logic for updated billing instance
        print(f"Billing updated with ID: {instance.pk}")

    # Example: Trigger a task, send email, etc.
    # Note: Redirects cannot be handled here.
