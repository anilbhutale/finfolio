# Generated by Django 5.0.7 on 2024-07-20 10:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contenttypes", "0002_remove_content_type_name"),
        ("transaction", "0004_remove_transaction_transaction_source_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="transaction",
            name="created_at",
        ),
        migrations.RemoveField(
            model_name="transaction",
            name="updated_at",
        ),
        migrations.AlterField(
            model_name="transaction",
            name="transaction_source_id",
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="transaction",
            name="transaction_source_type",
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to="contenttypes.contenttype"),
            preserve_default=False,
        ),
    ]