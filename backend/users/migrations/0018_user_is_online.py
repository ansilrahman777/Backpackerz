# Generated by Django 5.0.2 on 2024-05-16 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_alter_hotelbooking_booking_number_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_online',
            field=models.BooleanField(default=False),
        ),
    ]