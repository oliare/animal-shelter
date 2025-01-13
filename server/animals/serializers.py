from rest_framework import serializers
from .models import Animal, AnimalImage


class AnimalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalImage
        fields = "__all__"

class AnimalSerializer(serializers.ModelSerializer):
    images = AnimalImageSerializer(many=True, read_only=True)
    class Meta:
        model = Animal
        fields = [
                    'id', 'name', 'species', 'gender', 'age', 'breed', 'description',
                    'found_home', 'location', 'date_added', 'neutered', 'vaccinated',
                    'images'
                ]
        
    def validate_breed(self, value):
        if value not in [choice.value for choice in Animal.Breed]:
            return value 
        return value

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        animal = Animal.objects.create(**validated_data)
        
        for image in uploaded_images:
            AnimalImage.objects.create(animal=animal, photo=image)
        return animal


class AnimalSelectItemSerializer(serializers.Serializer):
    species = serializers.ChoiceField(choices=Animal.Species.choices)
    gender = serializers.ChoiceField(choices=Animal.Gender.choices)
    age = serializers.ChoiceField(choices=Animal.Age.choices)
    breed = serializers.ChoiceField(choices=Animal.Breed.choices)