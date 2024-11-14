# Generated by Django 5.0.7 on 2024-11-14 01:45

import uuid

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("customer", "0002_alter_customer_options_alter_customer_email_and_more"),
        ("inventory", "0003_alter_inventory_product"),
    ]

    operations = [
        migrations.CreateModel(
            name="Billing",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("date", models.DateTimeField(default=django.utils.timezone.now)),
                ("total_amount", models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ("customer", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="billings", to="customer.customer")),
            ],
            options={
                "verbose_name": "Billing",
                "verbose_name_plural": "Billings",
            },
        ),
        migrations.CreateModel(
            name="BillingItem",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("quantity", models.PositiveIntegerField()),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("total_price", models.DecimalField(decimal_places=2, editable=False, max_digits=10)),
                ("billing", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="billing_items", to="billing.billing")),
                (
                    "inventory_item",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="billing_items", to="inventory.inventory"),
                ),
            ],
            options={
                "verbose_name": "Billing Item",
                "verbose_name_plural": "Billing Items",
            },
        ),
    ]