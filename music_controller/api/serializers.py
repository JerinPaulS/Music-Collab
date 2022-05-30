from email import message
from rest_framework import serializers
from .models import Chat, Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes', 'created_at')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes')

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('initiator', 'image', 'message')