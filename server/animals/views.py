import os
from django.conf import settings
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import AnimalSerializer
from .models import Animal, AnimalImage
from rest_framework.response import Response


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

    def perform_destroy(self, instance):
        images = AnimalImage.objects.filter(animal=instance)
        for image in images:
            if image.photo:
                path = os.path.join(settings.MEDIA_ROOT, str(image.photo))
                if os.path.exists(path):
                    os.remove(path)
            image.delete()  
        
        instance.delete()
        return Response(status=204)

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
    
    