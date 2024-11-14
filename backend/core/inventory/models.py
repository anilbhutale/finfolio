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

    def generate_qr_code(self, data, text, qr_size=(100, 100), image_size=(200, 100), font_path="arial.ttf"):
        # Step 1: Create QR code
        qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=2)
        qr.add_data(data)
        qr.make(fit=True)
        qr_img = qr.make_image(fill="black", back_color="white").resize(qr_size)

        # Step 2: Create a blank image for QR and text
        img = Image.new("RGB", (qr_size[0] + image_size[0], max(qr_size[1], image_size[1])), "white")
        draw = ImageDraw.Draw(img)

        # Paste QR code
        img.paste(qr_img, (0, 0))

        # Load custom font, or use default if it fails
        try:
            font = ImageFont.truetype(font_path, 14)
        except IOError:
            font = ImageFont.load_default()

        # Calculate and position text beside QR code
        text_x = qr_size[0] + 10
        text_y = 15
        draw.multiline_text((text_x, text_y), text, font=font, fill="black")

        return img

    def save(self, *args, **kwargs):
        data = str(self.id)  # Ensure UUID is a string for QR code data
        text = f"SKU: {self.product.sku}\nName: {self.product.name}\nPrice: {self.sprice}\nColor: {self.color.name}\nSize: {self.size.size}"

        # Generate the QR code image
        qr_code_image = self.generate_qr_code(data, text)

        # Save to ImageField
        buffer = BytesIO()
        qr_code_image.save(buffer, format="PNG")
        buffer.seek(0)
        self.qr_code.save(f"qr_{self.product.sku}_{self.color.name}_{self.size.size}.png", ContentFile(buffer.read()), save=False)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} {self.color.name} {self.size.size} {self.sprice}"
