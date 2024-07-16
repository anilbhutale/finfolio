from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import CustomUser


class OptionAdmin(ModelAdmin):
    # def get_queryset(self, request):
    #     qs = super().get_queryset(request)
    #     if request.user.is_superuser:
    #         return qs
    #     return qs.filter(id=request.user.id)  # Filter based on the primary key

    # # def has_change_permission(self, request, obj=None):
    # #     if obj is not None and obj.id != request.user.id:
    # #         return False
    # #     return super().has_change_permission(request, obj)

    # # def has_delete_permission(self, request, obj=None):
    # #     if obj is not None and obj.id != request.user.id:
    # #         return False
    # #     return super().has_delete_permission(request, obj)

    list_display = [field.name for field in CustomUser._meta.fields]


admin.site.register(CustomUser, OptionAdmin)
