# Generated by Django 5.0.7 on 2024-11-11 12:36

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Customer",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=255)),
                ("email", models.EmailField(blank=True, max_length=255, null=True)),
                ("insta_id", models.EmailField(blank=True, max_length=255, null=True)),
                ("phone", models.CharField(blank=True, max_length=20, null=True)),
                ("address", models.TextField(blank=True, null=True)),
            ],
            options={
                "abstract": False,
            },
        ),
    ]