from django.urls import path
from .views import AddHotelAPIView, AddHotelDetailAPIView, AddHotelImageAPIView, AddHotelItineraryAPIView, CancelBookingAPIView, ConfirmBookingAPIView, EditHotelAPIView, EditHotelDetailAPIView, EditHotelImageAPIView, EditHotelItineraryAPIView, HotelBookingListAPIView, HotelListAPIView, HotelsByDestinationAPIView, ItineraryCreateAPIView, ItineraryUpdateAPIView, LoginAPIView ,LogoutAPIView, PackageBookingListAPIView, PackageExclusionCreateAPIView, PackageExclusionUpdateAPIView, PackageImageCreateAPIView, PackageImageUpdateAPIView, PackageInclusionCreateAPIView, PackageInclusionUpdateAPIView, PackageListAPIView, PackageDetailAPIView, AddPackageAPIView, EditPackageAPIView, DestinationListAPIView, DestinationDetailAPIView, HotelDetailAPIView, AddDestinationAPIView, EditDestinationAPIView
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

    path('destinations/', DestinationListAPIView.as_view(), name='destination-list'),
    path('destinations/add/', AddDestinationAPIView.as_view(), name='add-destination'),
    path('destination/<int:pk>/', DestinationDetailAPIView.as_view(), name='destination-detail'),
    path('destination/edit/<int:pk>/', EditDestinationAPIView.as_view(), name='edit-destination'),

    path('destinations/<int:destination_id>/hotels/', HotelsByDestinationAPIView.as_view(), name='hotels-by-destination'),


    path('hotels/', HotelListAPIView.as_view(), name='hotel-list'),
    path('hotels/add/', AddHotelAPIView.as_view(), name='add-hotel'),
    path('hotel/<int:pk>/', HotelDetailAPIView.as_view(), name='hotel-detail'),
    path('hotel/edit/<int:pk>/', EditHotelAPIView.as_view(), name='edit-hotel'),

    path('hotel-images/add/', AddHotelImageAPIView.as_view(), name='add-hotel-image'),
    path('hotel-images/edit/<int:pk>/', EditHotelImageAPIView.as_view(), name='edit-hotel-image'),

    path('hotel-itineraries/add/', AddHotelItineraryAPIView.as_view(), name='add-hotel-itinerary'),
    path('hotel-itineraries/edit/<int:pk>/', EditHotelItineraryAPIView.as_view(), name='edit-hotel-itinerary'),

    path('hotel-details/add/', AddHotelDetailAPIView.as_view(), name='add-hotel-detail'),
    path('hotel-details/edit/<int:pk>/', EditHotelDetailAPIView.as_view(), name='edit-hotel-detail'),

    path('package-bookings/', PackageBookingListAPIView.as_view(), name='package-booking-list'),
    path('hotel-bookings/', HotelBookingListAPIView.as_view(), name='hotel-booking-list'),

    path('package-bookings/<int:pk>/cancel/', CancelBookingAPIView.as_view(), name='admin_cancel_booking'),
    path('package-bookings/<int:pk>/confirm/', ConfirmBookingAPIView.as_view(), name='admin_confirm_booking'),

    path('chat-unique-users/', UniqueUserListView.as_view(), name='unique-users'),

]
