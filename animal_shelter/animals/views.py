import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms.create import CreateAnimal
from .models import Animal

def list(request):
    animals = Animal.objects.all()
    html_content = ''
    for i in animals: 
        html_content += f"<br><p>Name:{i.name}</p><p>Id:{i.pk}</p>"
    return HttpResponse(html_content)

@csrf_exempt
def create(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            form = CreateAnimal(data)

            if form.is_valid():
                form.save()
            return JsonResponse({'message': 'Animal created!'})
        
        except Exception as e:
            return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def delete(request, id):
    try:
        item = Animal.objects.get(pk=id)
        item.delete()
        return JsonResponse({'message': 'Animal deleted!'})

    except Exception as e:
        return JsonResponse({'error': str(e)})
