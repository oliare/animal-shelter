from django.urls import path
from animals import views


urlpatterns = [
    path('', views.list),
    path('create/', views.create),
    path('delete/<int:id>/', views.delete),
]