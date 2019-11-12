# Prueba desarrollador Python
## dependencias

 1. Python 3.x
 2. python pip
 3. Django
 4. npm
 5. angular
 6. angular CLI
 7. nodeJS

## Despliegue servicios rest Django

 1. Ingrese al directorio TSG_recursos 
 2. Instale las dependencias del archivo ***"requirements.txt"*** con el comando ***pip install -r requirements.txt***
 3. ejecute el comando ***python manage.py runserver***

## Despliegue API angular

 1. Ingrese al directorio TSGRecursosFront
 2. ejecute el comando ***"npm install"*** 
 3. ejecute el comando ***"ng serve -o"***

## Nota

 1. La API rest se ejecuta en el puerto 8000
 2. El cliente angular se ejecuta en el puerto 4200
 3. Si desea cambiar la ruta de consumo desde el cliente angular, acceda a la siguiente ruta:
TSGRecursosFront/src/app/services/**services-client.service.ts**
modifique la linea 9 con la ruta del host donde se encuentre ejecutando la REST API.
 
