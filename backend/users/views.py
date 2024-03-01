from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .utils import send_otp
from .models import OTP



# Create your views here.

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