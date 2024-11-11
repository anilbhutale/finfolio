import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from core.product.models import Product
from core.color.models import Color
from core.size.models import Size
from PIL import Image, ImageDraw, ImageFont
from api.models import UUIDPrimaryKeyModel
from django.db import models

class Inventory(UUIDPrimaryKeyModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventories')
    color = models.ForeignKey(Color, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sprice = models.DecimalField(max_digits=10, decimal_places=2)
    last_updated = models.DateTimeField(auto_now=True)
    qr_code = models.ImageField(upload_to='inventory_qr_codes/', blank=True, null=True)

    class Meta:
        unique_together = ('product', 'color', 'size')
        verbose_name_plural = "Inventory"

    @property
    def is_in_stock(self):
        return self.stock > 0

    def generate_qr_code(self, data, text, qr_size=(100, 100), image_size=(100, 100), font_path="arial.ttf"):
        """ 
        Generate a QR code image with accompanying text beside it.

        Args:
            data (str): Data to encode in the QR code.
            text (str): Text to display beside the QR code.
            qr_size (tuple): Size of the QR code in pixels.
            image_size (tuple): Overall size of the image in pixels.
            font_path (str): Path to the font file to use.

        Returns:
            Image: The generated image with the QR code and centered text.
        """
        # Step 1: Create QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=2
        )
        qr.add_data(data)
        qr.make(fit=True)
        qr_img = qr.make_image(fill="black", back_color="white").resize(qr_size)

        # Step 2: Create a blank image with the specified size
        img = Image.new("RGB", (image_size[0] + qr_size[0], max(qr_size[1], image_size[1])), "white")
        draw = ImageDraw.Draw(img)

        # Paste QR code onto the blank image on the left side
        img.paste(qr_img, (0, 0))

        # Step 3: Calculate font size and text dimensions to fit within image height
        font_size = 24
        font = ImageFont.load_default()
        text_width, text_height = self.get_text_dimensions(text, font)

        # Adjust font size to fit height of the image
        while text_height > image_size[1] and font_size > 5:
            font_size -= 1
            font = ImageFont.load_default()
            text_width, text_height = self.get_text_dimensions(text, font)

        # Step 4: Draw the text centered vertically beside the QR code
        text_x = qr_size[0] + 10  # Position text right of QR code
        text_y = 15 # Center text vertically

        draw.multiline_text((text_x, text_y), text, font=font, fill="black")

        return img

    def get_text_dimensions(self, text, font):
        """
        Helper function to calculate width and height of text using the specified font.
        """
        text_box = font.getbbox(text)
        text_width = text_box[2] - text_box[0]
        text_height = text_box[3] - text_box[1]
        return text_width, text_height

    def save(self, *args, **kwargs):
        """Override save method to generate or update QR code when saving"""
        # Generate data and text for the QR code
        data = self.id # Customize this data as needed
        text = f"SKU: {self.product.sku}\nName: {self.product.name}\nPrice: {self.sprice}\nColor: {self.color.name}\nSize: {self.size.size} \n\n\n\n\n"

        # Generate the QR code image
        qr_code_image = self.generate_qr_code(data, text)

        # Save the generated QR code to the model's ImageField
        buffer = BytesIO()
        qr_code_image.save(buffer, format="PNG")
        buffer.seek(0)
        self.qr_code.save(f"qr_{self.product.name}-{self.color.name}-{self.size.size}.png", ContentFile(buffer.read()), save=False)

        # Call the original save method
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} - {self.color.name} - {self.size.size}"
