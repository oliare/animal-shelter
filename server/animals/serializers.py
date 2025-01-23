from rest_framework import serializers
from .models import Animal, AnimalImage
import os
from django.core.files.storage import default_storage

class AnimalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalImage
        fields = ["id", "animal", "photo"]

class AnimalSerializer(serializers.ModelSerializer):
    images = AnimalImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    remove_images = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )

    class Meta:
        model = Animal
        fields = [
                    'id', 'name', 'species', 'gender', 'age', 'breed', 'description',
                    'found_home', 'location', 'date_added', 'neutered', 'vaccinated',
                    'images', 'uploaded_images', 'remove_images'
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
    
    def validate_remove_images(self, value):
        existing_ids = set(AnimalImage.objects.filter(id__in=value).values_list('id', flat=True))
        if len(existing_ids) != len(value):
            raise serializers.ValidationError("such images IDs don`t exist")
        return value

    def update(self, instance, validated_data):
        remove_images = validated_data.pop('remove_images', [])
        
        if remove_images:
            images_to_delete = AnimalImage.objects.filter(id__in=remove_images, animal=instance)
            for image in images_to_delete:
                if image.photo:
                    if default_storage.exists(image.photo.name):
                        default_storage.delete(image.photo.name)
                
                image.delete()

        uploaded_images = validated_data.pop('uploaded_images', [])
        if uploaded_images:
            for image in uploaded_images:
                AnimalImage.objects.create(animal=instance, photo=image)

        if not instance.images.exists() and not uploaded_images:
            raise serializers.ValidationError("At least one image is required")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
   
    
class AnimalSelectItemSerializer(serializers.Serializer):
    species = serializers.ChoiceField(choices=Animal.Species.choices)
    gender = serializers.ChoiceField(choices=Animal.Gender.choices)
    age = serializers.ChoiceField(choices=Animal.Age.choices)
    breed = serializers.ChoiceField(choices=Animal.Breed.choices)