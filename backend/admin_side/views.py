from django.shortcuts import render
from users.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .serializers import LoginSerializer, LogoutSerializer
from rest_framework import generics
from users.models import Package, PackageImage, Itinerary, PackageInclusion, PackageExclusion,HotelBooking,PackageBooking
from .serializers import PackageSerializer, PackageImageSerializer, ItinerarySerializer, PackageInclusionSerializer, PackageExclusionSerializer, UserSerializer
from django.contrib.auth import get_user_model
from users.models import User
from chat.models import ChatMessage


User = get_user_model()
class UniqueUserListView(APIView):
    def get(self, request, *args, **kwargs):
        # user_ids = ChatMessage.objects.values('sender').distinct()
        user_ids = ChatMessage.objects.exclude(sender__is_superuser=True).values('sender').distinct()
        users = User.objects.filter(id__in=user_ids)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------auth session------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------

class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user and user.is_superuser:
                login(request, user)
                return Response({'message':"admin login succes"},status=status.HTTP_200_OK)
            else:
                return Response("Invalid email or password", status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------auth session end------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------



# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Package session------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------


class PackageListAPIView(generics.ListAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class PackageDetailAPIView(generics.RetrieveAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddPackageAPIView(generics.CreateAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer


class EditPackageAPIView(generics.RetrieveUpdateAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class PackageImageCreateAPIView(generics.CreateAPIView):
    queryset = PackageImage.objects.all()
    serializer_class = PackageImageSerializer

class PackageImageUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = PackageImage.objects.all()
    serializer_class = PackageImageSerializer

# Views for Itinerary
class ItineraryCreateAPIView(generics.CreateAPIView):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer

class ItineraryUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer

# Views for PackageInclusion
class PackageInclusionCreateAPIView(generics.CreateAPIView):
    queryset = PackageInclusion.objects.all()
    serializer_class = PackageInclusionSerializer

class PackageInclusionUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = PackageInclusion.objects.all()
    serializer_class = PackageInclusionSerializer

# Views for PackageExclusion
class PackageExclusionCreateAPIView(generics.CreateAPIView):
    queryset = PackageExclusion.objects.all()
    serializer_class = PackageExclusionSerializer

class PackageExclusionUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = PackageExclusion.objects.all()
    serializer_class = PackageExclusionSerializer
# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------package session ends ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------

# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------destination session------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------


from .serializers import DestinationSerializer,HotelSerializer
from users.models import Destination, Hotel

class DestinationListAPIView(generics.ListAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

class DestinationDetailAPIView(generics.RetrieveAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddDestinationAPIView(generics.CreateAPIView):
    serializer_class = DestinationSerializer

class EditDestinationAPIView(generics.RetrieveUpdateAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer


class HotelDetailAPIView(generics.RetrieveAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({
            'request': self.request
        })
        return context
from .serializers import PackageBookingSerializer, HotelBookingSerializer

class PackageBookingListAPIView(generics.ListAPIView):
    queryset = PackageBooking.objects.all()
    serializer_class = PackageBookingSerializer

class HotelBookingListAPIView(generics.ListAPIView):
    queryset = HotelBooking.objects.all()
    serializer_class = HotelBookingSerializer

class CancelBookingAPIView(APIView):
    def patch(self, request, pk):
        try:
            booking = PackageBooking.objects.get(pk=pk)
            booking.status = 'Cancelled'
            booking.save()
            return Response({'message': 'Booking cancelled successfully'}, status=status.HTTP_200_OK)
        except PackageBooking.DoesNotExist:
            return Response({'message': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)

class ConfirmBookingAPIView(APIView):
    def patch(self, request, pk):
        try:
            booking = PackageBooking.objects.get(pk=pk)
            booking.status = 'Confirmed'
            booking.save()
            return Response({'message': 'Booking confirmed successfully'}, status=status.HTTP_200_OK)
        except PackageBooking.DoesNotExist:
            return Response({'message': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)