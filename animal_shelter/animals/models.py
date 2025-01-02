from django.db import models

class Animal(models.Model):
    class Species(models.TextChoices):
        ALL = 'All pets', 'Усі тварини'
        DOGS = 'Dogs', 'Собаки'
        CATS = 'Cats', 'Коти'

    class Gender(models.TextChoices):
        ALL = 'All', 'Усі'
        MALE = 'Male', 'Хлопчик'
        FEMALE = 'Female', 'Дівчинка'

    class Age(models.TextChoices):
        ALL = 'All', 'Усі'
        UP_TO_1 = 'up to 1 y.o.', 'до 1 р.'
        ONE_TO_TWO = '1-2 y.o.', '1-2 р.'
        TWO_TO_FIVE = '2 - 5 y.o.', '2-5 р.'
        OLDER_THAN_5 = 'Older than 5 y.o.', 'Старше 5 р.'

    class Breed(models.TextChoices):
        PUREBRED = 'Purebred', 'Породиста'
        NOT_PUREBRED = 'Unknown breed', 'Без породи'


    name = models.CharField(max_length=150)
    species = models.CharField(max_length=15, default=Species.ALL)
    gender = models.CharField(max_length=10, default=Gender.ALL)
    age = models.CharField(max_length=15, default=Age.ALL)
    breed = models.CharField(max_length=100, default=Breed.NOT_PUREBRED)
    photo = models.ImageField(upload_to='animals/')
    description = models.TextField(blank=True)
    found_home = models.BooleanField(default=False)
    location = models.CharField(max_length=255)
    date_added = models.DateField(auto_now_add=True)
    neutered = models.BooleanField(default=False)
    vaccinated = models.BooleanField(default=False)

    def __str__(self):
        return f"Name: {self.name}; Gender: {self.gender}; Found home: {self.found_home}; Location: {self.location}"
