# Generated by Django 5.0.7 on 2024-11-11 12:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("inventory", "0001_initial"),
        ("product", "0001_initial"),
        ("size", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="inventory",
            name="product",
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="inventories", to="product.product"),
        ),
        migrations.AddField(
            model_name="inventory",
            name="size",
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="size.size"),
        ),
        migrations.AlterUniqueTogether(
            name="inventory",
            unique_together={("product", "color", "size")},
        ),
    ]
