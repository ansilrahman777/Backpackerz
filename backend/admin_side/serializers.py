from rest_framework import serializers
from users.models import Package, PackageImage, Itinerary, PackageInclusion, PackageExclusion, User, HotelBooking, PackageBooking

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'email', 'is_online']
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

class LogoutSerializer(serializers.Serializer):
    pass  # No fields required for logout


class PackageImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageImage
        fields = '__all__'

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = '__all__'

class PackageInclusionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageInclusion
        fields = '__all__'

class PackageExclusionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageExclusion
        fields = '__all__'

class PackageSerializer(serializers.ModelSerializer):
    images = PackageImageSerializer(many=True, required=False)
    itinerary = ItinerarySerializer(many=True, required=False)
    inclusions = PackageInclusionSerializer(many=True, required=False)
    exclusions = PackageExclusionSerializer(many=True, required=False)

    class Meta:
        model = Package
        fields = '__all__'

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', [])
        itinerary_data = validated_data.pop('itinerary', [])
        inclusions_data = validated_data.pop('inclusions', [])
        exclusions_data = validated_data.pop('exclusions', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        self._update_nested(instance.images, images_data, PackageImage)
        self._update_nested(instance.itinerary, itinerary_data, Itinerary)
        self._update_nested(instance.inclusions, inclusions_data, PackageInclusion)
        self._update_nested(instance.exclusions, exclusions_data, PackageExclusion)

        return instance

    def _update_nested(self, related_manager, nested_data, model_class):
        """
        Helper method to update nested serializers.
        """
        existing_ids = {item.id: item for item in related_manager.all()}
        for item_data in nested_data:
            item_id = item_data.get('id')
            if item_id and item_id in existing_ids:
                item_instance = existing_ids.pop(item_id)
                for attr, value in item_data.items():
                    setattr(item_instance, attr, value)
                item_instance.save()
            else:
                model_class.objects.create(**item_data)

        for remaining_item in existing_ids.values():
            remaining_item.delete()



from users.models import Destination, Hotel, HotelImage, HotelItinerary, HotelDetail


class HotelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelImage
        fields = '__all__'

class HotelItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelItinerary
        fields = '__all__'

class HotelDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelDetail
        fields = '__all__'

class HotelSerializer(serializers.ModelSerializer):
    images = HotelImageSerializer(many=True, required=False)
    itinerary = HotelItinerarySerializer(many=True, required=False)
    details = HotelDetailSerializer(many=True, required=False)

    class Meta:
        model = Hotel
        fields = ['id','destination','destination_name','hotel_name', 'hotel_description','pricing', 'contact_no', 'hotel_type', 'is_available', 'rooms', 'rating', 'images', 'itinerary','details','image_url']

class DestinationSerializer(serializers.ModelSerializer):
    hotels = HotelSerializer(many=True, read_only=True)

    class Meta:
        model = Destination
        fields = ['id', 'destination_name', 'season', 'description', 'state', 'country', 'image_url', 'hotels']

class PackageBookingSerializer(serializers.ModelSerializer):
    package_name = serializers.CharField(source='package.package_name')  
    class Meta:
        model = PackageBooking
        fields = '__all__'

class HotelBookingSerializer(serializers.ModelSerializer):
    hotel_name = serializers.CharField(source='hotel.hotel_name')  
    class Meta:
        model = HotelBooking
        fields = '__all__'