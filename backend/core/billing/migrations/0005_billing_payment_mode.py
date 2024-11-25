# Generated by Django 5.0.7 on 2024-11-15 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("billing", "0004_alter_billingitem_options"),
    ]

    operations = [
        migrations.AddField(
            model_name="billing",
            name="payment_mode",
            field=models.CharField(
                choices=[("cash", "Cash"), ("online", "Online"), ("both", "Both")],
                default="cash",
                help_text="Select the payment mode for the billing",
                max_length=10,
            ),
        ),
    ]