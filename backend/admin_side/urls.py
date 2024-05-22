from django.urls import path
from .views import CancelBookingAPIView, ConfirmBookingAPIView, HotelBookingListAPIView, ItineraryCreateAPIView, ItineraryUpdateAPIView, LoginAPIView ,LogoutAPIView, PackageBookingListAPIView, PackageExclusionCreateAPIView, PackageExclusionUpdateAPIView, PackageImageCreateAPIView, PackageImageUpdateAPIView, PackageInclusionCreateAPIView, PackageInclusionUpdateAPIView, PackageListAPIView, PackageDetailAPIView, AddPackageAPIView, EditPackageAPIView, DestinationListAPIView, DestinationDetailAPIView, HotelDetailAPIView, AddDestinationAPIView, EditDestinationAPIView
from .views import UniqueUserListView

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),

    path('packages/', PackageListAPIView.as_view(), name='package-list'),
    path('packages/<int:pk>/', PackageDetailAPIView.as_view(), name='package-detail'),
    path('packages/add/', AddPackageAPIView.as_view(), name='add-package'),
    path('packages/edit/<int:pk>/', EditPackageAPIView.as_view(), name='edit-package'),

    path('package-images/add/', PackageImageCreateAPIView.as_view(), name='add-package-image'),
    path('package-images/edit/<int:pk>/', PackageImageUpdateAPIView.as_view(), name='edit-package-image'),

    path('itineraries/add/', ItineraryCreateAPIView.as_view(), name='add-itinerary'),
    path('itineraries/edit/<int:pk>/', ItineraryUpdateAPIView.as_view(), name='edit-itinerary'),

    path('inclusions/add/', PackageInclusionCreateAPIView.as_view(), name='add-inclusion'),
    path('inclusions/edit/<int:pk>/', PackageInclusionUpdateAPIView.as_view(), name='edit-inclusion'),

    path('exclusions/add/', PackageExclusionCreateAPIView.as_view(), name='add-exclusion'),
    path('exclusions/edit/<int:pk>/', PackageExclusionUpdateAPIView.as_view(), name='edit-exclusion'),
    
    path('destinations/', DestinationListAPIView.as_view(), name='destination'),
    path('destinations/add/', AddDestinationAPIView.as_view(), name='add-destination'),
    path('destination/<int:pk>/', DestinationDetailAPIView.as_view(), name='destination-detail'),
    path('destination/edit/<int:pk>/', EditDestinationAPIView.as_view(), name='edit-destination'),

    path('hotels/<int:pk>/', HotelDetailAPIView.as_view(), name='hotel-detail'),

    path('package-bookings/', PackageBookingListAPIView.as_view(), name='package-booking-list'),
    path('hotel-bookings/', HotelBookingListAPIView.as_view(), name='hotel-booking-list'),

    path('package-bookings/<int:pk>/cancel/', CancelBookingAPIView.as_view(), name='admin_cancel_booking'),
    path('package-bookings/<int:pk>/confirm/', ConfirmBookingAPIView.as_view(), name='admin_confirm_booking'),

    path('chat-unique-users/', UniqueUserListView.as_view(), name='unique-users'),

]
