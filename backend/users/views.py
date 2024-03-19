from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer ,LoginSerializer ,PasswordResetRequestSerializer ,SetNewPasswordSerializer ,LogoutUserSerializer
from .serializers import PackageSerializer, PackageImageSerializer, ItinerarySerializer, PackageInclusionSerializer, PackageExclusionSerializer, GoogleSignInSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .utils import send_otp
from .models import OTP, User, Package, PackageImage, Itinerary, PackageInclusion, PackageExclusion
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import generics



# Create your views here.

# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Auth session ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------


class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data = user_data)

        if serializer.is_valid(raise_exception = True):
            serializer.save()
            user=serializer.data

            #send email function user['email]
            send_otp(user['email'])

            return Response({
                'data':user,
                'message':f'Hi {user["first_name"]} thanks for singing up a otp has sent to your registerd email'

            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_404_BAD_REQUEST)

class VerifyUserEmail(GenericAPIView):
    def post(self, request):
        otpcode=request.data.get('otp')

        try:
            user_code_obj=OTP.objects.get(code=otpcode)
            user=user_code_obj.user
            
            if not user.is_verified:
                user.is_verified=True
                user.save()
                return Response({
                    'message':'Email verified Successfully'
                },status=status.HTTP_200_OK)
            return Response({
                'message':'Otp is invalid, User already Verified'
            },status=status.HTTP_204_NO_CONTENT)

        except OTP.DoesNotExist:
            return Response({
                'message':'Invalid Otp try again'
            },status=status.HTTP_404_NOT_FOUND)

class LoginUserView(GenericAPIView):
    serializer_class=LoginSerializer
    def post(self, request):
        serializer=self.serializer_class(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data,status=status.HTTP_200_OK)


class TestLogin(GenericAPIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        data ={
            'msg':'its ok done'
        }
        return Response(data,status=status.HTTP_200_OK)


class PasswordResetRequestView(GenericAPIView):
    serializer_class= PasswordResetRequestSerializer
    def post(self,request):
        serializer = self.serializer_class(data=request.data,context={"request":request})
        serializer.is_valid(raise_exception=True)
        return Response({'message':"a link has been sent to your email to reset your password"},status=status.HTTP_200_OK)

class PasswordResetConfirm(GenericAPIView):
    def get(self, request,uidb64,token):
        try:
            user_id= smart_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                return Response({'message':'token is invalid or has expired '},status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success':True,'message':'Credentials is valid','uidb64':uidb64,'token':token,},status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError:
            return Response({'message':'token is invalid or has expired or not found '},status=status.HTTP_401_UNAUTHORIZED)

class SetNewPassword(GenericAPIView):
        serializer_class= SetNewPasswordSerializer
        def patch(self,request):
            serializer=self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            return Response ({'message':'Password reset Successfull'},status=status.HTTP_200_OK)

class LogoutUserView(GenericAPIView):
    serializer_class=LogoutUserSerializer
    permission_class=[IsAuthenticated]

    def post(self,request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Auth session end------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------



# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Google SignIN session ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------
# class GoogleOauthSignInview(GenericAPIView):
#     serializer_class=GoogleSignInSerializer

#     def post(self, request):
#         print(request.data)
#         serializer=self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         data=((serializer.validated_data)['access_token'])
#         return Response(data, status=status.HTTP_200_OK) 

class GoogleOauthSignInView(GenericAPIView):
    serializer_class = GoogleSignInSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        return Response(data, status=status.HTTP_200_OK)

# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Google SignIN end------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------





# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Package session------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------



class PackageListAPIView(generics.ListAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class PackageImageListAPIView(generics.ListAPIView):
    queryset = PackageImage.objects.all()
    serializer_class = PackageImageSerializer

class ItineraryListAPIView(generics.ListAPIView):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer

class PackageInclusionListAPIView(generics.ListAPIView):
    queryset = PackageInclusion.objects.all()
    serializer_class = PackageInclusionSerializer

class PackageExclusionListAPIView(generics.ListAPIView):
    queryset = PackageExclusion.objects.all()
    serializer_class = PackageExclusionSerializer

class PackageDetailAPIView(generics.RetrieveAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)