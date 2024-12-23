# models.py
from django.conf import settings
from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
