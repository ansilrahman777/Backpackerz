from django.urls import path
from .views import LoginAPIView ,LogoutAPIView, PackageListAPIView, PackageDetailAPIView, AddPackageAPIView, EditPackageAPIView

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),

    path('packages/', PackageListAPIView.as_view(), name='package-list'),
    path('packages/<int:pk>/', PackageDetailAPIView.as_view(), name='package-detail'),
    path('packages/add/', AddPackageAPIView.as_view(), name='add-package'),
    path('packages/edit/<int:pk>/', EditPackageAPIView.as_view(), name='edit-package'),

]
