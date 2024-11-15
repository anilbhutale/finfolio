import os
from io import BytesIO

import qrcode
from django.conf import settings
from django.core.files.base import ContentFile
from django.db import models
from PIL import Image, ImageDraw, ImageFont

from api.models import UUIDPrimaryKeyModel
from core.color.models import Color
from core.product.models import Product
from core.size.models import Size


class Inventory(UUIDPrimaryKeyModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="inventory_items")
    color = models.ForeignKey(Color, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sprice = models.DecimalField(max_digits=10, decimal_places=2)
    last_updated = models.DateTimeField(auto_now=True)
    qr_code = models.ImageField(upload_to="inventory_qr_codes/", blank=True, null=True)

    class Meta:
        unique_together = ("product", "color", "size")
        verbose_name_plural = "Inventory"

    @property
    def is_in_stock(self):
        return self.stock > 0

    def generate_qr_code(self, data, qr_size=(100, 100)):
        # Create QR code (no text)
        qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=2)
        qr.add_data(data)
        qr.make(fit=True)
        
        # Generate the QR code image
        qr_img = qr.make_image(fill="black", back_color="white").resize(qr_size)
        return qr_img

    def save(self, *args, **kwargs):
        data = str(self.id)  # Use the Inventory ID or other data you want in the QR code

        # Generate the QR code image (without text)
        qr_code_image = self.generate_qr_code(data)

        # Save to ImageField
        buffer = BytesIO()
        qr_code_image.save(buffer, format="PNG")
        buffer.seek(0)
        self.qr_code.save(f"qr_{self.product.sku}_{self.color.name}_{self.size.size}.png", ContentFile(buffer.read()), save=False)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} {self.color.name} {self.size.size} {self.sprice}"