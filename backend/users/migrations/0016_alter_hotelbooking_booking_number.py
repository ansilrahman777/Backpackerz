# Generated by Django 5.0.2 on 2024-05-15 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_alter_hotelbooking_booking_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotelbooking',
            name='booking_number',
            field=models.CharField(blank=True, max_length=20, null=True, unique=True),
        ),
    ]