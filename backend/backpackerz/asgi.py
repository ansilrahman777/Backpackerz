"""
ASGI config for backpackerz project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backpackerz.settings')
django.setup()
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from chat.route import websocket_urlpattern



application = get_asgi_application()

application = ProtocolTypeRouter({
  "http":application,
  "websocket":URLRouter(websocket_urlpattern) 
})
