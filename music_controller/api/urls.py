from django.urls import path
from .views import RoomView, CreateRoomView, ChatView

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('chat', ChatView.as_view()),
]
