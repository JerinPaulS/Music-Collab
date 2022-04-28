from django.shortcuts import render
from itsdangerous import Serializer
from rest_framework import generics, status
from yaml import serialize
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CrateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serialize.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes = serializer.data.get('votes')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes = votes
                room.save(update_fields=['guest_can_pause', 'votes'])
            else:
                room =  Room(host=host, guest_can_pause=guest_can_pause, votes=votes)
                room.save()
            return Response(RoomSerializer(room.data, status=status.HTTP_201_CREATED))