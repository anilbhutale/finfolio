from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view  # Fixed the typo here
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.inventory.views import print_all_qr_codes

# from core.views import toggle_sidebar
from core import urls
from core.admin import my_admin_site
from core.inventory.views import InventoryItemSearchView, get_inventory_sprice
from core.users.views import RegisterView, UserAPIView
from core.billing import views

schema_view = get_schema_view(
    openapi.Info(
        title="My API",
        default_version="v1",
        description="My API description",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="Awesome License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("wifi_in/", my_admin_site.urls),
    path(
        "api-playground/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("api/v1/user/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/user/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/v1/user/register/", RegisterView.as_view(), name="user_register"),
    path("api/v1/user/", UserAPIView.as_view(), name="user_detail"),  # Changed the name here to avoid confusion with 'user_register'
    path("api/v1/", include(urls)),
    path("get_inventory_sprice/", get_inventory_sprice, name="get_inventory_sprice"),
    path("api/inventory-items/", InventoryItemSearchView.as_view(), name="inventory-item-search"),
    path('api/billing/<uuid:billing_id>/print/', views.print_receipt, name='core_billing_print_receipt'),
    path('api/print-qr-code/<uuid:product_id>/', print_all_qr_codes, name='print_all_qr_codes'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
