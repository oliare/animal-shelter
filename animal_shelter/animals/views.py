from rest_framework import generics
from .serializers import AnimalSerializer
from .models import Animal

class AnimalList(generics.ListAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class CreateAnimal(generics.CreateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class UpdateAnimal(generics.UpdateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    
class DeleteAnimal(generics.DestroyAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class AnimalDetail(generics.RetrieveAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
