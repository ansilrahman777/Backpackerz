from django.utils import timezone
from django.db import models

from users.models import User

class ChatMessage(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE,related_name='send_messages')
    message = models.TextField(null=True, blank=True)
    user_id = models.IntegerField() 
    group = models.CharField(max_length=100)
    is_read = models.BooleanField(default=False)
    is_send = models.BooleanField(default=False)
    time_stamp = models.DateTimeField(default=timezone.now)