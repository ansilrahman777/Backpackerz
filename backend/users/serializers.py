from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken,TokenError

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