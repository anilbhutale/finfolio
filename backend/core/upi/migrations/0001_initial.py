# Generated by Django 5.0.7 on 2024-07-20 09:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("bank_account", "0003_alter_bankaccount_account_type_alter_bankaccount_id"),
        ("credit_card", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="UPIApp",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="UPI",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("upi_id", models.CharField(max_length=50, unique=True)),
                (
                    "bank_account",
                    models.ForeignKey(
                        blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name="upi_accounts", to="bank_account.bankaccount"
                    ),
                ),
                (
                    "credit_card",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="upi_credit_cards",
                        to="credit_card.creditcard",
                    ),
                ),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ("app", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="upi.upiapp")),
            ],
        ),
    ]
