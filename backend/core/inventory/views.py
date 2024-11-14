from django.db.models import Q
from django.http import JsonResponse
from django.views import View

from core.inventory.models import Inventory


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
