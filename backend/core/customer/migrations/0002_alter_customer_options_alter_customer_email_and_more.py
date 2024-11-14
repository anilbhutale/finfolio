# Generated by Django 5.0.7 on 2024-11-14 01:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("customer", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="customer",
            options={"verbose_name": "Customer", "verbose_name_plural": "Customers"},
        ),
        migrations.AlterField(
            model_name="customer",
            name="email",
            field=models.EmailField(blank=True, max_length=255, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name="customer",
            name="insta_id",
            field=models.CharField(blank=True, max_length=255, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name="customer",
            name="name",
            field=models.CharField(db_index=True, max_length=255),
        ),
        migrations.AlterField(
            model_name="customer",
            name="phone",
            field=models.CharField(blank=True, max_length=20, null=True, unique=True),
        ),
    ]