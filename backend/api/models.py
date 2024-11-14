import uuid

from django.db import models


class UUIDPrimaryKeyModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)  # Set when the object is created
    updated_at = models.DateTimeField(auto_now=True)  # Set when the object is saved/updated

    class Meta:
        abstract = True
