# Generated by Django 5.0.7 on 2024-07-31 19:36

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("debit_card", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="debitcard",
            name="name",
            field=models.CharField(default=django.utils.timezone.now, max_length=50),
            preserve_default=False,
        ),
    ]
