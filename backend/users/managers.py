from django.contrib.auth.models import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(("Please enter a valid email address"))
    
    def create_user(self,email, first_name, last_name ,password ,mobile ,**extra_fields):
        if email:
            email=self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(_("an email address is required"))
        if not first_name:
            raise ValueError(_("first name is required"))

        user = self.model(
            email=email, 
            first_name=first_name, 
            last_name=last_name, 
            mobile=mobile, 
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email,first_name,last_name, mobile, password,**extra_fields):
        
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_verified', True)

        if extra_fields.get('is_staff',True) is not True:
            raise ValueError(_("is staff must be true for admin user"))

        if extra_fields.get('is_superuser',True) is not True:
            raise ValueError(_("is superuser must be true for admin user"))
        
        user = self.create_user(
            email = self.normalize_email(email),
            password = password,
            first_name=first_name,
            last_name=last_name,
            mobile = mobile,
            **extra_fields
        )

        user.save(using=self._db)
        return user
