from django.shortcuts import render
from users.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .serializers import LoginSerializer, LogoutSerializer
from rest_framework import generics
from users.models import Package, PackageImage, Itinerary, PackageInclusion, PackageExclusion
from .serializers import PackageSerializer, PackageImageSerializer, ItinerarySerializer, PackageInclusionSerializer, PackageExclusionSerializer


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
    serializer_class = PackageSerializer


class EditPackageAPIView(generics.RetrieveUpdateAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer