# Generated by Django 5.0.7 on 2024-11-11 12:36

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("category", "0001_initial"),
        ("type", "0001_initial"),
        ("variant", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=200)),
                ("sku", models.CharField(max_length=20)),
                ("description", models.TextField(blank=True, null=True)),
                ("category", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="category.productcategory")),
                ("product_type", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="type.producttype")),
                ("variant", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="variant.productvariant")),
            ],
            options={
                "abstract": False,
            },
        ),
    ]