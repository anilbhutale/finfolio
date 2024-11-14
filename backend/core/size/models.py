from django.db import models

from api.models import UUIDPrimaryKeyModel


class Size(UUIDPrimaryKeyModel):
    size = models.CharField(max_length=20)

    def __str__(self):
        return self.size
