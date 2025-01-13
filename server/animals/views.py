from rest_framework import generics
from rest_framework.views import APIView
from .serializers import AnimalSerializer
from .models import Animal
from rest_framework.response import Response
from rest_framework.decorators import api_view


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

class AnimalSelectItemView(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            "species": dict(Animal.Species.choices),
            "gender": dict(Animal.Gender.choices),
            "age": dict(Animal.Age.choices),
            "breed": dict(Animal.Breed.choices),
        }
        return Response(data)
    
    