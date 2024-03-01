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
