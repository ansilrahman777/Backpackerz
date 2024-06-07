from django.urls import path
from .views import HotelBookingListByHotelAPIView, HotelReviewListCreateAPIView, RegisterUserView ,VerifyUserEmail ,LoginUserView ,PasswordResetConfirm ,PasswordResetRequestView ,SetNewPassword ,LogoutUserView ,TestLogin
from .views import PackageExclusionListAPIView, PackageInclusionListAPIView, ItineraryListAPIView, PackageImageListAPIView, PackageListAPIView, PackageDetailAPIView, GoogleOauthSignInView, DestinationListAPIView, DestinationDetailView, UserListCreateAPIView, UserRetrieveUpdateAPIView
from .views import HotelDetailAPIView, HotelBookingListCreateAPIView, HotelBookingDetailView, StripeCheckoutView, StripeSuccessView, PackageBookingListAPIView, PackageBookingDetailAPIView, UserPackageBookingListAPIView,UserHotelBookingListAPIView,CancelBookingAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/',RegisterUserView.as_view(),name='register'),
    path('verify-email/',VerifyUserEmail.as_view(),name='verify'),
    path('login/',LoginUserView.as_view(),name='login'),
    path('logout/',LogoutUserView.as_view(),name='logout'),
    path('token/refresh/',TokenRefreshView.as_view(),name='refresh-token'),

    path('google/', GoogleOauthSignInView.as_view(), name='google'),

    path('logintest/',TestLogin.as_view(),name='test'),

    path('password-reset/',PasswordResetRequestView.as_view(),name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/',PasswordResetConfirm.as_view(),name='password-reset-confirm'),
    path('set-new-password/',SetNewPassword.as_view(),name='set-new-password'),


    path('packages/', PackageListAPIView.as_view(), name='package-list'),
    path('package-images/', PackageImageListAPIView.as_view(), name='package-image-list'),
    path('itineraries/', ItineraryListAPIView.as_view(), name='itinerary-list'),
    path('inclusions/', PackageInclusionListAPIView.as_view(), name='inclusion-list'),
    path('exclusions/', PackageExclusionListAPIView.as_view(), name='exclusion-list'),
    path('packages/<int:pk>/',PackageDetailAPIView.as_view(), name='package-detail'),

    path('destinations/', DestinationListAPIView.as_view(), name='destination-list'),
    path('destination/<int:pk>/', DestinationDetailView.as_view(), name='destination-detail'),
    path('hotels/<int:pk>/', HotelDetailAPIView.as_view(), name='hotel-detail'),


    path('users/', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateAPIView.as_view(), name='user-detail-update'),

     path('packagebookings/', PackageBookingListAPIView.as_view(), name='package-booking'),
    path('packagebookings/<int:pk>/', PackageBookingDetailAPIView.as_view(), name='package-booking-detail'),
    path('user-package-bookings/<int:user_id>/', UserPackageBookingListAPIView.as_view(), name='user-package-booking-list'),
    path('package-bookings/<int:pk>/cancel/', CancelBookingAPIView.as_view(), name='package-booking-cancel'),

    
    path('hotelbookings/', HotelBookingListCreateAPIView.as_view(), name='hotel-booking'),
    path('hotelbookings/<int:pk>', HotelBookingDetailView.as_view(), name='hotel-booking-detail'),
    path('user-hotel-bookings/<int:user_id>/', UserHotelBookingListAPIView.as_view(), name='user-hotel-booking-list'),
    path('hotels/<int:hotel_id>/bookings/', HotelBookingListByHotelAPIView.as_view(), name='hotel-bookings-list'),
    path('hotel-reviews/', HotelReviewListCreateAPIView.as_view(), name='hotel-review-list-create'),


    path('create-checkout-session/',StripeCheckoutView.as_view(), name='create-checkout-session'),
    path('stripe-success/', StripeSuccessView.as_view(), name='stripe-success')
]
