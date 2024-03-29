# Generated by Django 5.0.2 on 2024-03-04 08:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_otp'),
    ]

    operations = [
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('package_name', models.CharField(max_length=255, verbose_name='Package Name')),
                ('description', models.TextField(verbose_name='Description')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Price')),
                ('duration', models.PositiveIntegerField(verbose_name='Duration in days')),
                ('destination', models.CharField(max_length=255, verbose_name='Destination')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
            ],
            options={
                'verbose_name': 'Package',
                'verbose_name_plural': 'Packages',
            },
        ),
        migrations.CreateModel(
            name='Itinerary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day_number', models.PositiveIntegerField(verbose_name='Day Number')),
                ('description', models.TextField(verbose_name='Description')),
                ('image', models.ImageField(upload_to='photos/package_images/day_wise_itinerary', verbose_name='Image')),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='itinerary', to='users.package')),
            ],
            options={
                'verbose_name': 'Itinerary',
                'verbose_name_plural': 'Itineraries',
            },
        ),
        migrations.CreateModel(
            name='PackageExclusion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exclusion', models.CharField(max_length=255)),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exclusions', to='users.package')),
            ],
        ),
        migrations.CreateModel(
            name='PackageImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='photos/package_images/', verbose_name='Image')),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='users.package')),
            ],
            options={
                'verbose_name': 'Package Image',
                'verbose_name_plural': 'Package Images',
            },
        ),
        migrations.CreateModel(
            name='PackageInclusion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inclusion', models.CharField(max_length=255)),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inclusions', to='users.package')),
            ],
        ),
    ]
