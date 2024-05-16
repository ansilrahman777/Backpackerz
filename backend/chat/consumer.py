from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import ChatMessage
# from .models import User
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async
from django.utils import timezone
from channels.db import database_sync_to_async
from django.utils import timezone


User = get_user_model()

class PersonalChatConsumer(AsyncWebsocketConsumer):
  async def connect(self):
        user_id = self.scope['url_route']['kwargs']['id']
        self.room_group_name = f'chat_{user_id}'

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        await self.update_user_status(user_id, 'online')

        existing_messages = await self.get_existing_messages() 
        for message in existing_messages:
            await self.send(text_data=json.dumps({
                'message': message['message'],
                'sender': message['sender'],
                'time_stamp': timezone.now().isoformat(),
            }))

      


  @database_sync_to_async
  def get_existing_messages(self):
      messages = ChatMessage.objects.filter(group=self.room_group_name)
      return [{'message': message.message, 'sender': message.sender.id, 'time_stamp': 'placeholder'} for message in messages]
    
  async def receive(self, text_data):
      print("Received message:", text_data)
      data = json.loads(text_data)
      nested_message = data['message']
      message = nested_message['message']
      print(data)
      sender_id = nested_message['sender']

      current_timestamp = timezone.now()


      print("======================================",text_data) 
      print("messageeeeeeeeeeeeeeeeee",data)
      print("senderrrrrrrrrrrrrrrrrrrr",sender_id)

      try:
        sender_user = await sync_to_async(User.objects.get)(id=sender_id)
      except User.DoesNotExist:
        sender_user = None

      if sender_user:
        chat_message = await sync_to_async(ChatMessage.objects.create)(
            sender=sender_user,
            message = message,
            user_id = sender_user.id,
            group = self.room_group_name,
        )

      await self.channel_layer.group_send(
          self.room_group_name,
          {
              'type':'chat.message',
              'data':{
                  'message':message,
                  'sender':sender_id,
                  'time_stamp': current_timestamp.isoformat(),
              },
    })

  async def disconnect(self, close_code):
      user_id = self.scope['url_route']['kwargs']['id']
      await self.update_user_status(user_id, 'offline')

      await self.channel_layer.group_discard(
          self.room_group_name,
          self.channel_name
      ) 

  @database_sync_to_async
  def update_user_status(self, user_id, status):
      # Update the user's status in the database
      user = User.objects.get(id=user_id)
      user.is_online  = status == 'online'
      user.save()       


  async def chat_message(self, event):
        message = event['data']['message']
        sender = event['data']['sender']
        time_stamp = event['data']['time_stamp']
        await self.send(text_data=json.dumps({
            "message":message,
            'sender':sender,
            "time_stamp": time_stamp,
        }))