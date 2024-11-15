# Generated by Django 5.0.7 on 2024-07-16 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bank_account", "0002_bankaccount_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="bankaccount",
            name="account_type",
            field=models.CharField(choices=[("savings", "Savings"), ("current", "Current"), ("other", "Othet")], max_length=10),
        ),
        migrations.AlterField(
            model_name="bankaccount",
            name="id",
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID"),
        ),
    ]
