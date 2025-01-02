from django import forms
from animals.models import Animal


class CreateAnimal(forms.ModelForm):
    class Meta:
        model = Animal
        fields = '__all__'