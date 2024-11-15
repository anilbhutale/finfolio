# Generated by Django 5.0.7 on 2024-07-16 19:28

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Wallet",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=255)),
                ("limit", models.DecimalField(decimal_places=2, max_digits=10)),
                ("current_balance", models.DecimalField(decimal_places=2, max_digits=10)),
                ("type", models.CharField(choices=[("digital", "Digital"), ("cash", "Cash")], max_length=10)),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
