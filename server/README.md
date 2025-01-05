## *Django Server Setup*

This is a guide for setting up a new project using **Django**.

- Create a virtual environment: `python -m venv venv`
- Activate the environment: `myvenv/Scripts/activate` (on Windows) or `source myvenv/bin/activate` (on macOS/Linux)
- Install Django: `pip install django`
- Create a project: `django-admin startproject myproject` (or `python -m django startproject myproject`)
- Run the server: `python manage.py runserver`
- Create a new app: `python manage.py startapp myapp`
- Create migrations: `python manage.py makemigrations`
- Apply migrations: `python manage.py migrate`
- Load data into the database: `python manage.py loaddata dataname`
