# Generated by Django 5.0.2 on 2024-05-11 10:20

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_rename_point_hoteldetail_detail'),
    ]

    operations = [
        migrations.CreateModel(
            name='HotelBooking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(null=True)),
                ('no_of_guest', models.PositiveIntegerField()),
                ('no_of_room', models.PositiveIntegerField()),
                ('total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(choices=[('Pending Payment', 'Pending Payment'), ('Payment Complete', 'Payment Complete'), ('Returned', 'Returned')], default='Pending Payment', max_length=50)),
                ('payment_method', models.CharField(choices=[('Stripe', 'Stripe'), ('Not-paid', 'Not-paid')], default='Not-paid', max_length=20)),
                ('booking_status', models.CharField(choices=[('Upcoming', 'Upcoming'), ('Ongoing', 'Ongoing'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled'), ('Cancelled by Admin', 'Cancelled by Admin')], default='Upcoming', max_length=20)),
                ('booking_number', models.CharField(blank=True, max_length=20, null=True, unique=True)),
                ('hotel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.hotel')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]