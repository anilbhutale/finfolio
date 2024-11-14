from django.db import models

from api.models import UUIDPrimaryKeyModel


class Color(UUIDPrimaryKeyModel):
    name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=7)  # Hex color code like #FFFFFF

    def __str__(self):
        return self.name
