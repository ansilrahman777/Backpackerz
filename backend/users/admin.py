from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, OTP, Package, PackageImage, Itinerary, PackageInclusion, PackageExclusion


class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'first_name', 'last_name', 'mobile', 'is_staff', 'is_superuser', 'is_verified', 'is_active', 'date_joined', 'last_login')
    ordering = ('email',)

admin.site.register(User, CustomUserAdmin)

@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    model = OTP
    list_display = ('user', 'code')


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ['package_name', 'destination', 'price', 'duration', 'created_at', 'updated_at']
    search_fields = ['package_name', 'destination']

@admin.register(PackageImage)
class PackageImageAdmin(admin.ModelAdmin):
    list_display = ['package', 'image']

@admin.register(Itinerary)
class ItineraryAdmin(admin.ModelAdmin):
    list_display = ['package', 'day_number', 'description', 'image']
    list_filter = ['package']

@admin.register(PackageInclusion)
class PackageInclusionAdmin(admin.ModelAdmin):
    list_display = ['package', 'inclusion']
    list_filter = ['package']

@admin.register(PackageExclusion)
class PackageExclusionAdmin(admin.ModelAdmin):
    list_display = ['package', 'exclusion']
    list_filter = ['package']