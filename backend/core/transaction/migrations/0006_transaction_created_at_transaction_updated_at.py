# Generated by Django 5.0.7 on 2024-07-20 10:16

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("transaction", "0005_remove_transaction_created_at_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="transaction",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="transaction",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
