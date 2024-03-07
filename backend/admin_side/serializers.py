from rest_framework import serializers
from users.models import Package, PackageImage, Itinerary, PackageInclusion, PackageExclusion

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
    # images = PackageImageSerializer(many=True, read_only=True)
    # itinerary = ItinerarySerializer(many=True, read_only=True)
    # inclusions = PackageInclusionSerializer(many=True, read_only=True)
    # exclusions = PackageExclusionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Package
        fields = '__all__'
