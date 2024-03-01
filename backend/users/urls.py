from django.urls import path
from .views import RegisterUserView ,VerifyUserEmail ,LoginUserView ,PasswordResetConfirm ,PasswordResetRequestView ,SetNewPassword ,LogoutUserView


urlpatterns = [
    path('register/',RegisterUserView.as_view(),name='register'),
    path('verify-email/',VerifyUserEmail.as_view(),name='verify'),
    path('login/',LoginUserView.as_view(),name='login'),
    path('logout/',LogoutUserView.as_view(),name='logout'),
    # path('logintest/',TestLogin.as_view(),name='test'),
    path('password_reset/',PasswordResetRequestView.as_view(),name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/',PasswordResetConfirm.as_view(),name='password-reset-confirm'),
    path('set-new-password/',SetNewPassword.as_view(),name='set-new-password'),
]
