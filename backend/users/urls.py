from django.urls import path
from .views import RegisterUserView ,VerifyUserEmail ,LoginUserView ,PasswordResetConfirm ,PasswordResetRequestView ,SetNewPassword ,LogoutUserView ,TestLogin
from .views import PackageExclusionListAPIView, PackageInclusionListAPIView, ItineraryListAPIView, PackageImageListAPIView, PackageListAPIView, PackageDetailAPIView, GoogleOauthSignInView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/',RegisterUserView.as_view(),name='register'),
    path('verify-email/',VerifyUserEmail.as_view(),name='verify'),
    path('login/',LoginUserView.as_view(),name='login'),
    path('logout/',LogoutUserView.as_view(),name='logout'),
    path('toekn/refresh/',TokenRefreshView.as_view(),name='refresh-token'),

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


]
