from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, OTP, Package, PackageImage, Itinerary, PackageInclusion, PackageExclusion, Destination, Hotel, HotelImage, HotelItinerary

admin.site.register(User)

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

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ['destination_name', 'season','description','state','country']
    list_filter = ['destination_name']

@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ['destination', 'hotel_name','pricing','hotel_type','is_available','rooms']
    list_filter = ['destination']

@admin.register(HotelImage)
class HotelImageAdmin(admin.ModelAdmin):
    list_display = ['hotel', 'image']
    list_filter = ['hotel']

@admin.register(HotelItinerary)
class HotelItineraryAdmin(admin.ModelAdmin):
    list_display = ['hotel', 'day','description','activity']
    list_filter = ['hotel']