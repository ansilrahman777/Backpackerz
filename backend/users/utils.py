#------------------------------------------------------------------------------------------------------------------------------------
#-------------------------------------------------OTP & EMAIL VERIFY-----------------------------------------------------------------
#------------------------------------------------------------------------------------------------------------------------------------



import random
from django.core.mail import EmailMessage
from .models import User,OTP
from django.conf import settings 

def generateOtp():
    otp=""
    for i in range(6):
        otp+=str(random.randint(1,9))
    return otp

def send_otp(email):
    subject="One time passcode for Email Verification"
    otp_code=generateOtp()
    print(otp_code)
    user=User.objects.get(email=email)
    current_site='BackPackerz'
    email_body=f"Hi {user.first_name} thanks for signing up on {current_site} please verify your email with the \none time password {otp_code}."
    from_email= settings.DEFAULT_FROM_EMAIL

    OTP.objects.create(user=user,code=otp_code)
    
    send_email=EmailMessage(subject=subject, body=email_body, from_email=from_email, to=[email])
    send_email.send(fail_silently=True)

def send_normal_email(data):
    email=EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,
        to=[data['to_email']]
    )
    email.send(fail_silently=True)


#------------------------------------------------------------------------------------------------------------------------------------
#---------------------------------------------------- Google SignIN------------------------------------------------------------------
#------------------------------------------------------------------------------------------------------------------------------------

import requests
from google.auth.transport import requests
from google.oauth2 import id_token
from .models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed



# class Google():
#     @staticmethod
#     def validate(access_token):
#         try:
#             id_info=id_token.verify_oauth2_token(access_token, requests.Request())
#             if 'accounts.google.com' in id_info['iss']:
#                 return id_info
#         except:
#             return "the token is either invalid or has expired"



# def google_login(email,password):
#     user=authenticate(email=email,password=password)
#     user_token=user.tokens()
#     return {
#         'email':user.email,
#         'full_name':user.get_full_name,
#         "access_token":str(tokens.get('access')),
#         "refresh_token":str(tokens.get('refresh'))
#         }

# def register_social_user(provider, email, first_name, last_name):
#     user=User.objects.filter(email=email)
#     if user.exists():
#         if provider == user[0].auth_provider:
#             google_login(email,settings.SOCIAL_AUTH_PASSWORD)
            
#         else:
#             raise AuthenticationFailed(
#                 detail=f"please continue your login with {old_user[0].auth_provider}"
#             )
#     else:
#         new_user={
#             'email':email,
#             'first_name':first_name,
#             'last_name':last_name,
#             'password':settings.SOCIAL_AUTH_PASSWORD
#         }
#         user=User.objects.create_user(**new_user)
#         user.auth_provider=provider
#         user.is_verified=True
#         user.save()
#         google_login=authenticate(email=user.email, password=settings.SOCIAL_AUTH_PASSWORD)
       

class Google():
    @staticmethod
    def validate(access_token):
        try:
            id_info = id_token.verify_oauth2_token(access_token, requests.Request())
            if 'accounts.google.com' in id_info['iss']:
                return id_info
        except:
            return "the token is either invalid or has expired"

def google_login(email, password):
    user = authenticate(email=email, password=password)
    user_token = user.tokens()  # Assuming this method exists in your User model
    return {
        'email': user.email,
        'full_name': user.get_full_name,  # Corrected method call
        "access_token": str(user_token.get('access')),  # Corrected variable name
        "refresh_token": str(user_token.get('refresh'))  # Corrected variable name
    }

def register_social_user(provider, email, first_name, last_name):
    user = User.objects.filter(email=email)
    if user.exists():
        if provider == user[0].auth_provider:
            return google_login(email, settings.SOCIAL_AUTH_PASSWORD)
        else:
            raise AuthenticationFailed(
                detail=f"please continue your login with {user[0].auth_provider}"
            )
    else:
        new_user = {
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'mobile':'',
            'password': settings.SOCIAL_AUTH_PASSWORD
        }
        user = User.objects.create_user(**new_user)
        user.auth_provider = provider
        user.is_verified = True
        user.save()
        return google_login(email=user.email, password=settings.SOCIAL_AUTH_PASSWORD)  # Corrected variable name
