from django.urls import path
from .consumer import PersonalChatConsumer


websocket_urlpattern = [
  path('ws/chat/<int:id>/', PersonalChatConsumer.as_asgi()),
]