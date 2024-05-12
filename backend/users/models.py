from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import UserManager
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
import uuid

# Create your models here.
AUTH_PROVIDERS={'email':'email','google':'google'}
class User(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(max_length=255,unique=True,verbose_name=_('Email Address'))
    first_name = models.CharField(max_length=100,verbose_name=_('First Name'))
    last_name = models.CharField(max_length=100,verbose_name=_('Last Name'))
    mobile = models.CharField(max_length=50, unique=True)
    
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(max_length=50,default=AUTH_PROVIDERS.get('email'))

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name","last_name","mobile"]

    objects = UserManager()

    def __str__(self):
        return self.email
    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def tokens(self):
        refresh = RefreshToken.for_user(self)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

class OTP(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    code=models.CharField(max_length=6,unique=True)
    
    def __str__(self):
        return f"{self.user.first_name} passcode "

class Package(models.Model):
    package_name = models.CharField(_("Package Name"), max_length=255)
    description = models.TextField(_("Description"))
    price = models.DecimalField(_("Price"), max_digits=10, decimal_places=2)
    duration = models.PositiveIntegerField(_("Duration in days"))
    destination = models.CharField(_("Destination"), max_length=255)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    image_url = models.ImageField(_("Package Image"), upload_to='photos/package/', null=True)

    class Meta:
        verbose_name = _("Package")
        verbose_name_plural = _("Packages")

    def __str__(self):
        return self.package_name

class PackageImage(models.Model):
    package = models.ForeignKey(Package, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(_("Image"), upload_to='photos/package_images/')

    class Meta:
        verbose_name = _("Package Image")
        verbose_name_plural = _("Package Images")

    def __str__(self):
        return f"Image for {self.package.package_name}"

class Itinerary(models.Model):
    package = models.ForeignKey(Package, related_name='itinerary', on_delete=models.CASCADE)
    day_number = models.PositiveIntegerField(_("Day Number"))
    description = models.TextField(_("Description"))
    image = models.ImageField(_("Image"), upload_to='photos/package_images/day_wise_itinerary')

    class Meta:
        verbose_name = _("Itinerary")
        verbose_name_plural = _("Itineraries")

    def __str__(self):
        return f"Day {self.day_number} - {self.package.package_name}"

class PackageInclusion(models.Model):
    package = models.ForeignKey('Package', related_name='inclusions', on_delete=models.CASCADE)
    inclusion = models.CharField(max_length=255)

    def __str__(self):
        return self.inclusion

class PackageExclusion(models.Model):
    package = models.ForeignKey('Package', related_name='exclusions', on_delete=models.CASCADE)
    exclusion = models.CharField(max_length=255)

    def __str__(self):
        return self.exclusion


class Destination(models.Model):
    destination_name = models.CharField(_("Destination Name"), max_length=255)
    season = models.CharField(_("Season"), max_length=100)
    description = models.TextField(_("Description"))
    state = models.CharField(_("State"), max_length=100)
    country = models.CharField(_("Country"), max_length=100)
    image_url = models.ImageField(_("Image"), upload_to='photos/destination/',null=True)

    class Meta:
        verbose_name = _("Destination")
        verbose_name_plural = _("Destinations")

    def __str__(self):
        return self.destination_name

class Hotel(models.Model):
    destination = models.ForeignKey(Destination, related_name='hotels', on_delete=models.CASCADE)
    hotel_name = models.CharField(_("Hotel Name"), max_length=255)
    hotel_description = models.CharField(_("Hotel description"),null=True)
    pricing = models.DecimalField(_("Pricing"), max_digits=10, decimal_places=2)
    contact_no = models.CharField(_("Contact No"), max_length=20)
    hotel_type = models.CharField(_("Hotel Type"), max_length=100)
    is_available = models.BooleanField(_("Is Available"), default=True)
    rooms = models.PositiveIntegerField(_("Rooms"))
    rating = models.DecimalField(_("Rating"), max_digits=3, decimal_places=2)
    image_url = models.ImageField(_("Hotel Image"), upload_to='photos/hotel/', null=True)

    class Meta:
        verbose_name = _("Hotel")
        verbose_name_plural = _("Hotels")

    def __str__(self):
        return self.hotel_name

class HotelImage(models.Model):
    hotel = models.ForeignKey(Hotel, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(_("Image"), upload_to='photos/hotel_images/')

    class Meta:
        verbose_name = _("Hotel Image")
        verbose_name_plural = _("Hotel Images")

    def __str__(self):
        return f"Image for {self.hotel.hotel_name}"

class HotelItinerary(models.Model):
    hotel = models.ForeignKey(Hotel, related_name='itinerary', on_delete=models.CASCADE)
    day = models.PositiveIntegerField(_("Day"))
    description = models.TextField(_("Description"))
    activity = models.TextField(_("Activity"), blank=True, null=True)

    class Meta:
        verbose_name = _("Hotel Itinerary")
        verbose_name_plural = _("Hotel Itineraries")

    def __str__(self):
        return f"Day {self.day} - {self.hotel.hotel_name} Itinerary"

class HotelDetail(models.Model):
    hotel = models.ForeignKey(Hotel, related_name='details', on_delete=models.CASCADE)
    detail = models.CharField(_("Point"), max_length=255)

    class Meta:
        verbose_name = _("Hotel Detail")
        verbose_name_plural = _("Hotel Details")

    def __str__(self):
        return f"{self.hotel.hotel_name} - {self.detail}"


class HotelBooking(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('Pending Payment', 'Pending Payment'),
        ('Payment Complete', 'Payment Complete'),
        ('Returned', 'Returned')
    ]

    PAYMENT_METHOD_CHOICES = [
        ('Stripe', 'Stripe'),
        ('Not-paid', 'Not-paid')
    ]

    BOOKING_STATUS_CHOICES = [
        ('Upcoming', 'Upcoming'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
        ('Cancelled by Admin', 'Cancelled by Admin'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=254)
    start_date = models.DateField()
    end_date = models.DateField(null=True)
    no_of_guest = models.PositiveIntegerField()
    no_of_room = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=PAYMENT_STATUS_CHOICES, default='Pending Payment')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='Not-paid')
    booking_status = models.CharField(max_length=20, choices=BOOKING_STATUS_CHOICES, default='Upcoming')
    booking_number = models.CharField(max_length=20, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.booking_number:
            self.booking_number = self.generate_booking_number()
        super().save(*args, **kwargs)

    def generate_booking_number(self):
        unique_id = uuid.uuid4().hex[:6].upper()  
        return f'BOOK-{unique_id}'   

    def __str__(self):
        return f"{self.full_name} - {self.hotel.hotel_name}"