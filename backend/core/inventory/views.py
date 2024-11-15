from django.db.models import Q
from django.http import JsonResponse
from django.views import View
from core.product.models import Product

from core.inventory.models import Inventory
from django.shortcuts import render, get_object_or_404
import qrcode
from io import BytesIO


def get_inventory_sprice(request):
    inventory_id = request.GET.get("inventory_id")
    if inventory_id:
        try:
            inventory_item = Inventory.objects.get(id=inventory_id)
            return JsonResponse({"sprice": inventory_item.sprice})
        except Inventory.DoesNotExist:
            return JsonResponse({"sprice": "N/A"}, status=404)
    return JsonResponse({"error": "Invalid request"}, status=400)


class InventoryItemSearchView(View):
    def get(self, request):
        search_query = request.GET.get("search", "")
        print(search_query)
        # Filter items by either name or id
        inventory_items = Inventory.objects.filter(Q(product__name__icontains=search_query) | Q(id__icontains=search_query))[
            :10
        ]  # Limit results for performance
        # print(inventory_items)
        # Serialize and return the data
        data = [
            {"id": item.id, "name": item.product.name, "color": item.color.name, "size": item.size.size, "sprice": item.sprice}
            for item in inventory_items
        ]
        return JsonResponse(data, safe=False)



def print_all_qr_codes(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    inventory_items = product.inventory_items.all()

    qr_codes = []
    for inventory in inventory_items:
        qr_code_data = {
            'product_name': inventory.product.name,
            'sku': inventory.product.sku,
            'color': inventory.color.name,
            'size': inventory.size.size,
            'stock': inventory.stock,
            'price': inventory.price,
            'sprice': inventory.sprice,
            'qr_code': inventory.qr_code.url,  # Assuming qr_code is the image field URL
        }
        qr_codes.append(qr_code_data)

    return render(request, 'inventory/print_qr_code.html', {'qr_codes': qr_codes})