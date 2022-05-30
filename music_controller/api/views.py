from urllib import response
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import ChatSerializer, RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def get(self, request, form=None):
        serializer = self.serializer_class(data=request.data)
        return Response(status=status.HTTP_200_OK)

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes = serializer.data.get('votes')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes = votes
                room.save(update_fields=['guest_can_pause', 'votes'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes=votes)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class ChatView(APIView):
    serializer_class = ChatSerializer

    def get(self, request, form=None):
        serializer = self.serializer_class(data=request.data)
        return Response(status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        queryset = Room.objects.all()
        curr = queryset
        curr.initiator = "Test"
        curr.image = "123"
        curr.message = "Hey this is in the function"
        return Response(ChatSerializer(curr).data, status=status.HTTP_201_CREATED)