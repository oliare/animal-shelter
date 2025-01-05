from django.urls import path
from animals import views


urlpatterns = [
    path('', views.AnimalList.as_view()),
    path('create/', views.CreateAnimal.as_view()),
    path('<int:pk>/', views.AnimalDetail.as_view()),
    path('<int:pk>/delete/', views.DeleteAnimal.as_view()),
    path('<int:pk>/update/', views.UpdateAnimal.as_view()),
]