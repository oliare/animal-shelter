from django.db import models

class Animal(models.Model):
    class Species(models.TextChoices):
        ALL = 'All pets'
        DOGS = 'Dogs'
        CATS = 'Cats'

    class Gender(models.TextChoices):
        ALL = 'All'
        MALE = 'Male'
        FEMALE = 'Female'

    class Age(models.TextChoices):
        ALL = 'All'
        UP_TO_1 = 'Up to 1 y.o.'
        ONE_TO_TWO = '1 - 2 y.o.'
        TWO_TO_FIVE = '2 - 5 y.o.'
        OLDER_THAN_5 = 'Older than 5 y.o.'

    class Breed(models.TextChoices):
        PUREBRED = 'Purebred'
        NOT_PUREBRED = 'Unknown breed'   


    name = models.CharField(max_length=150)
    species = models.CharField(max_length=15, default=Species.ALL)
    gender = models.CharField(max_length=10, default=Gender.ALL)
    age = models.CharField(max_length=15, default=Age.ALL)
    breed = models.CharField(max_length=100, default=Breed.NOT_PUREBRED)
    description = models.TextField(blank=True)
    found_home = models.BooleanField(default=False)
    location = models.CharField(max_length=255)
    date_added = models.DateField(auto_now_add=True)
    neutered = models.BooleanField(default=False)
    vaccinated = models.BooleanField(default=False)
    uploaded_images = models.ImageField(upload_to='animals/')

    def __str__(self):
        return f"Name: {self.name}; Gender: {self.gender}; Found home: {self.found_home}; Location: {self.location}"

class AnimalImage(models.Model):
    animal = models.ForeignKey(Animal, related_name='images', on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='animals/')
