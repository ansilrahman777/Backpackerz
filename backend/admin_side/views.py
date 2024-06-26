from django.http import JsonResponse
from django.shortcuts import render
from users.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .serializers import LoginSerializer, LogoutSerializer
from rest_framework import status, generics, permissions
from users.models import Package, PackageImage, Itinerary, PackageInclusion, PackageExclusion,HotelBooking,PackageBooking
from .serializers import PackageSerializer, PackageImageSerializer, ItinerarySerializer, PackageInclusionSerializer, PackageExclusionSerializer, UserSerializer
from django.contrib.auth import get_user_model
from users.models import User
from chat.models import ChatMessage
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Sum ,Count
from datetime import datetime

import logging

logger = logging.getLogger(__name__)

User = get_user_model()

class DashboardAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        # Get the last 5 package bookings
        last_five_package_bookings = PackageBooking.objects.all().order_by('-booking_date')[:5]
        package_booking_serializer = PackageBookingSerializer(last_five_package_bookings, many=True)
        
        # Calculate total revenue from hotel bookings
        total_hotel_revenue = HotelBooking.objects.aggregate(total_revenue=Sum('total'))['total_revenue']

        # Get the last 5 hotel bookings
        last_five_hotel_bookings = HotelBooking.objects.all().order_by('-booking_date')[:5]
        hotel_booking_serializer = HotelBookingSerializer(last_five_hotel_bookings, many=True)

        # Get the last 5 registered users
        last_five_users = User.objects.all().order_by('-date_joined')[:5]
        user_serializer = UserSerializer(last_five_users, many=True)
        total_users = User.objects.count()

        # Get total counts
        total_package_bookings = PackageBooking.objects.count()
        total_hotel_bookings = HotelBooking.objects.count()
        
        package_bookings_per_month = PackageBooking.objects.filter(booking_date__year=datetime.now().year) \
            .values('booking_date__month') \
            .annotate(count=Count('id')) \
            .order_by('booking_date__month')

        hotel_bookings_per_month = HotelBooking.objects.filter(booking_date__year=datetime.now().year) \
            .values('booking_date__month') \
            .annotate(count=Count('id')) \
            .order_by('booking_date__month')

        package_bookings_monthly = [0] * 12
        hotel_bookings_monthly = [0] * 12

        for booking in package_bookings_per_month:
            package_bookings_monthly[booking['booking_date__month'] - 1] = booking['count']

        for booking in hotel_bookings_per_month:
            hotel_bookings_monthly[booking['booking_date__month'] - 1] = booking['count']


        data = {
            'last_five_package_bookings': package_booking_serializer.data,
            'last_five_hotel_bookings': hotel_booking_serializer.data,
            'last_five_users': user_serializer.data,
            'total_package_bookings': total_package_bookings,
            'total_hotel_bookings': total_hotel_bookings,
            'total_users': total_users,
            'total_hotel_revenue': total_hotel_revenue or 0,
            'package_bookings_per_month': list(package_bookings_per_month),
            'hotel_bookings_per_month': list(hotel_bookings_per_month),
        }
        logger.debug(f"Admin dashboard data: {data}")
        return Response(data)
class UserListView(APIView):
    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        data = [
            {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'full_name':user.get_full_name,
                'email': user.email,
                'phone': user.mobile,
                'is_active':user.is_active,
                'is_verified':user.is_verified,
                'date_joined': user.date_joined,
            }
            for user in users
        ]
        return JsonResponse({'users': data}, status=status.HTTP_200_OK) 

class ToggleUserActiveView(APIView):
    def post(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            user.is_active = not user.is_active
            user.save()
            return JsonResponse({'message': 'User status toggled successfully', 'is_active': user.is_active}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
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
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user and user.is_superuser:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'user': {
                        'email': user.email,
                        'user_id': user.id,
                        'name': user.get_full_name,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'mobile': user.mobile,
                        'admin': user.is_superuser,
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response("Invalid email or password", status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
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
    permission_classes = [permissions.AllowAny]
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class PackageDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddPackageAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Package.objects.all()
    serializer_class = PackageSerializer


class EditPackageAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class PackageImageCreateAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = PackageImage.objects.all()
    serializer_class = PackageImageSerializer

class PackageImageUpdateAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = PackageImage.objects.all()
    serializer_class = PackageImageSerializer

# Views for Itinerary
class ItineraryCreateAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer

class ItineraryUpdateAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer

# Views for PackageInclusion
class PackageInclusionCreateAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = PackageInclusion.objects.all()
    serializer_class = PackageInclusionSerializer

class PackageInclusionUpdateAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = PackageInclusion.objects.all()
    serializer_class = PackageInclusionSerializer

# Views for PackageExclusion
class PackageExclusionCreateAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = PackageExclusion.objects.all()
    serializer_class = PackageExclusionSerializer

class PackageExclusionUpdateAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = PackageExclusion.objects.all()
    serializer_class = PackageExclusionSerializer
# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------package session ends ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------

# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------destination session------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------


from users.models import Destination, Hotel, HotelImage, HotelItinerary, HotelDetail
from .serializers import DestinationSerializer, HotelSerializer, HotelImageSerializer, HotelItinerarySerializer, HotelDetailSerializer

# Destination Views
class DestinationListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

class DestinationDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class HotelsByDestinationAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = HotelSerializer

    def get_queryset(self):
        destination_id = self.kwargs['destination_id']
        return Hotel.objects.filter(destination_id=destination_id)

class AddDestinationAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

class EditDestinationAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

# Hotel Views
class HotelListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class HotelDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class AddHotelAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class EditHotelAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

# Hotel Image Views
class AddHotelImageAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HotelImage.objects.all()
    serializer_class = HotelImageSerializer

class EditHotelImageAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HotelImage.objects.all()
    serializer_class = HotelImageSerializer

# Hotel Itinerary Views
class AddHotelItineraryAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HotelItinerary.objects.all()
    serializer_class = HotelItinerarySerializer

class EditHotelItineraryAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HotelItinerary.objects.all()
    serializer_class = HotelItinerarySerializer

# Hotel Detail Views
class AddHotelDetailAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HotelDetail.objects.all()
    serializer_class = HotelDetailSerializer

class EditHotelDetailAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HotelDetail.objects.all()
    serializer_class = HotelDetailSerializer

    


from .serializers import PackageBookingSerializer, HotelBookingSerializer

class PackageBookingListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = PackageBooking.objects.all().order_by('-booking_date')
    serializer_class = PackageBookingSerializer

class HotelBookingListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HotelBooking.objects.all().order_by('-booking_date')
    serializer_class = HotelBookingSerializer

class CancelBookingAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def patch(self, request, pk):
        try:
            booking = PackageBooking.objects.get(pk=pk)
            booking.status = 'Cancelled'
            booking.save()
            return Response({'message': 'Booking cancelled successfully'}, status=status.HTTP_200_OK)
        except PackageBooking.DoesNotExist:
            return Response({'message': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)

class ConfirmBookingAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def patch(self, request, pk):
        try:
            booking = PackageBooking.objects.get(pk=pk)
            booking.status = 'Confirmed'
            booking.save()
            return Response({'message': 'Booking confirmed successfully'}, status=status.HTTP_200_OK)
        except PackageBooking.DoesNotExist:
            return Response({'message': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)
        
class UpdateBookingStatusAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk):
        try:
            booking = HotelBooking.objects.get(pk=pk)
            new_status = request.data.get('status')
            if new_status in dict(HotelBooking.BOOKING_STATUS_CHOICES):
                booking.booking_status = new_status
                booking.save()
                return Response({'status': 'success'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        except HotelBooking.DoesNotExist:
            return Response({'status': 'not found'}, status=status.HTTP_404_NOT_FOUND)