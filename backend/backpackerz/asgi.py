"""
ASGI config for backpackerz project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
# Initialize Django
import django
django.setup()
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backpackerz.settings')

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack  # Ensure AuthMiddlewareStack is imported
from .urls import websocket_urlpattern




os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backpackerz.settings')
# Get the default ASGI application
django_asgi_app = get_asgi_application()

# Define the application for handling different protocols
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(  # Wrap URLRouter with AuthMiddlewareStack
        URLRouter(
            websocket_urlpattern
        )
    ),
})
