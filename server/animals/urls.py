from django.urls import path
from animals import views


urlpatterns = [
    path('', views.AnimalList.as_view()),
    path('create', views.CreateAnimal.as_view()),
    path('detail/<int:pk>', views.AnimalDetail.as_view()),
    path('delete/<int:pk>', views.DeleteAnimal.as_view()),
    path('update/<int:pk>', views.UpdateAnimal.as_view()),
    path('select-items/', views.AnimalSelectItemView.as_view()),
]