# Generated by Django 5.0.7 on 2024-07-19 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("transaction", "0002_transaction_title"),
    ]

    operations = [
        migrations.AlterField(
            model_name="transaction",
            name="title",
            field=models.CharField(),
        ),
    ]
