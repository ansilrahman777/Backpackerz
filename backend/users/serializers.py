from rest_framework import serializers
from .models import User, Package, PackageImage, Itinerary, PackageInclusion, PackageExclusion
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode , urlsafe_base64_decode
from django.utils.encoding import smart_str, smart_bytes ,force_str,DjangoUnicodeDecodeError
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import send_normal_email ,Google,register_social_user
from django.conf import settings 



# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Auth Section ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68,min_length=8,write_only=True)
    confirm_password = serializers.CharField(max_length=68,min_length=8,write_only=True)

    class Meta:
        model = User
        fields = ['email','first_name','last_name','password','confirm_password','mobile']

    def validate(self,attrs):
        password = attrs.get('password','')
        confirm_password = attrs.get('confirm_password','')
        if password != confirm_password:
            raise serializers.ValidationError('password do not match')
        return attrs

    def create(self,validated_data):

        user=User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data.get('first_name'),    
            last_name=validated_data.get('last_name'),    
            mobile=validated_data.get('mobile'),
            password=validated_data.get('password'),
        )
        return user 

class LoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=225,min_length=6)
    password=serializers.CharField(max_length=68,write_only=True)
    full_name=serializers.CharField(max_length=225,read_only=True)
    mobile=serializers.CharField(max_length=225,read_only=True)
    
    access_token=serializers.CharField(max_length=225,read_only=True)
    refresh_token=serializers.CharField(max_length=50,read_only=True)
    
    class Meta:
        model=User
        fields=['email','password','full_name','mobile','access_token','refresh_token']

    def validate(self ,attrs):
        email=attrs.get('email')
        password=attrs.get('password')
        request=self.context.get('request')
        user=authenticate(request,email=email,password=password)

        if not user:
            raise AuthenticationFailed('Invalid Credentials Please try again')
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')
        user_tokens=user.tokens()

        return {
            'email':user.email,
            'full_name':user.get_full_name,
            'mobile':user.mobile,
            'access_token':str(user_tokens.get('access')),
            'refresh_token':str(user_tokens.get('refresh'))
        }

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=225)

    class Meta:
        fields = ['email']

    def validate(self,attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            uidb64=urlsafe_base64_encode(smart_bytes(user.id))
            token=PasswordResetTokenGenerator().make_token(user)
            request = self.context.get('request')
            site_domain=get_current_site(request).domain
            relative_link =reverse('password-reset-confirm', kwargs={'uidb64':uidb64,'token':token})
            abslink=f"http://{site_domain}{relative_link}"
            email_body=f"Hi use this link below to reset your Password \n {abslink}"
            data={
                'email_body': email_body,
                'email_subject': "Reset Your Password",
                'to_email': user.email
            }
            send_normal_email(data)

            return super().validate(attrs)

class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=68,min_length=8,write_only=True)
    confirm_password = serializers.CharField(max_length=68,min_length=8,write_only=True)
    uidb64=serializers.CharField(write_only=True)
    token=serializers.CharField(write_only=True)

    class Meta:
        fields=['password','confirm_password','uidb64','token']

    def validate(self,attrs):
        try:
            token=attrs.get('token')
            uidb64=attrs.get('uidb64')
            password=attrs.get('password')
            confirm_password=attrs.get('confirm_password')

            user_id=force_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise AuthenticationFailed('reset link is invalid or has expired 401 ',401)
            if password != confirm_password:
                raise AuthenticationFailed('Password do not match')
            user.set_password(password)
            user.save()
            return user
        except (TypeError, ValueError, OverflowError, User.DoesNotExist, DjangoUnicodeDecodeError):
            raise AuthenticationFailed('Reset link is invalid or has expired.', code=401)



class LogoutUserSerializer(serializers.Serializer):
    refresh_token=serializers.CharField()
    default_error_messages={
        'bad_token':('Token is invalid or has expired')
    }
    def validate(self,attrs):
        self.token=attrs.get('refresh_token')
        return attrs

    def save(self,**kwargs):
        try:
            token=RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            return self.fail('bad_token')
    class Meta:
        fields = ['refresh_token']


# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Auth Section end------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------



# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------GOOGLE Signin Section ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------

# class GoogleSignInSerializer(serializers.Serializer):
#     access_token=serializers.CharField(min_length=6)


#     def validate_access_token(self, access_token):
#         google_user_data=Google.validate(access_token)
#         try:
#             userid=google_user_data['sub']
            
#         except:
#             raise serializers.ValidationError("this token has expired or invalid please try again")
        
#         if google_user_data['aud'] != settings.GOOGLE_CLIENT_ID:
#             raise AuthenticationFailed('Could not verify user.')

#         email=google_user_data['email']
#         first_name=google_user_data['given_name']
#         last_name=google_user_data['family_name']
#         provider='google'

#         return register_social_user(provider, email, first_name, last_name)
class GoogleSignInSerializer(serializers.Serializer):
    access_token = serializers.CharField(min_length=6)

    def validate_access_token(self, access_token):
        google_user_data = Google.validate(access_token)
        try:
            userid = google_user_data['sub']
        except:
            raise serializers.ValidationError("this token has expired or invalid please try again")
        
        if google_user_data['aud'] != settings.GOOGLE_CLIENT_ID:
            raise AuthenticationFailed('Could not verify user.')

        email = google_user_data['email']
        first_name = google_user_data['given_name']
        last_name = google_user_data['family_name']
        provider = 'google'

        return register_social_user(provider, email, first_name, last_name)




# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------GOOGLE Signin Section ends ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------



# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Package Section ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------



class PackageImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageImage
        fields = '__all__'

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = '__all__'

class PackageInclusionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageInclusion
        fields = '__all__'

class PackageExclusionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageExclusion
        fields = '__all__'
class PackageSerializer(serializers.ModelSerializer):
    images = PackageImageSerializer(many=True, read_only=True)
    itinerary = ItinerarySerializer(many=True, read_only=True)
    inclusions = PackageInclusionSerializer(many=True, read_only=True)
    exclusions = PackageExclusionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Package
        fields = '__all__'



# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Package section ends ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------


# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Destination Sections ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------

from .models import Destination, Hotel, HotelImage, HotelItinerary


class HotelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelImage
        fields = ['image']

class HotelItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelItinerary
        fields = ['day', 'description', 'activity']

class HotelSerializer(serializers.ModelSerializer):
    images = HotelImageSerializer(many=True, read_only=True)
    itinerary = HotelItinerarySerializer(many=True, read_only=True)

    class Meta:
        model = Hotel
        fields = ['id', 'hotel_name', 'pricing', 'contact_no', 'hotel_type', 'is_available', 'rooms', 'rating', 'images', 'itinerary']

class DestinationSerializer(serializers.ModelSerializer):
    hotels = HotelSerializer(many=True, read_only=True)

    class Meta:
        model = Destination
        fields = ['id', 'destination_name', 'season', 'description', 'state', 'country', 'image_url', 'hotels']



# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------Destination Sections ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------



# --------------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------User Sections ------------------------------------------------------
# --------------------------------------------------------------------------------------------------------------------------

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'mobile', 'is_staff', 'is_superuser', 'is_verified', 'is_active', 'date_joined', 'last_login']

