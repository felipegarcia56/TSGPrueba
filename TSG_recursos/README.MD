# Documentación Django Rest API
## Rutas expuestas:
1.  areaService/
2.  marcaService/
3.  proveedorService/
4.  estadoService/
5.  tipoRService/
6.  responsableService/
7.  personaService/
8.  recursoService/
9.  asignaService/

# CRUD.
La estructura de request y response de los siguientes servicios respetan los mismos formatos:
 - marcaService/
 - proveedorService/
 - estadoService/
 - tipoRService/
 - responsableService/ 
### Nota:
para el servicio ***responsableService/*** cambiar la llave ***descripcion***, por ***telefono***, en el POST de este servicio se retorna adicionalmente el ***id*** del responsable creado, el cual será usado en los servicios: ***personaService/*** y ***areaService/***

### Creación (POST):
Request body:
```json
			{
				"descripcion":"Marca_1"
			}
```
Response body:
```json
			{  
				"success":  "Marca_1 agregada exitosamente"  
			}
``` 
### Consulta (GET):
Enviar petición GET a la url ***"http://localhost:8000/marcaService/"***, retornara la lista de todas las marcas creadas.
Response body
```json
	{  
		"response":  [  
						{  
							"id":  18,  
							"descripcion":  "Marca_1"  
						}  
					]  
	}
``` 
### Actualización(PUT):
Request body
```json
		{
            "id": 18,
            "descripcion": "Marca_1_actualizada"
		 }
```
Response body
```json
		{  
			"success":  "Marca_1_actualizada actualizada correctamente"  
		}
```
### Borrado(Delete):
Request a la url donde se envíe como parámetro el id de la marca que se desea eliminar.
***http://localhost:8000/marcaService/?id=18***  
Response body
```json
		{  
			"success":  " borrado correctamente"  
		}
```

## CRUD personas

### POST
Request body
```json
	{
		"apellido":"García Reina",
		"nombre":"Luis Felipe",
		"responsable":92
	}
```
Response body
```json
	{  
		"response":  "Luis Felipe García Reina guardado éxitosamente"  
	}
```

### GET
Request body
```json
http://localhost:8000/personaService/
```
Response body
```json
	{  
		"response":  [  
						{  
							"id":  51,  
							"nombre":  "Luis Felipe",  
							"apellido":  "García Reina",  
							"responsable":  {  
												"id":  92,  
												"telefono":  "3203084480"  
											}  
						}  
					]  
	}
```

### PUT
Request body
```json
	{
            "id": 51,
            "nombre": "Luis",
            "apellido": "García",
            "responsable": 92
	}
```
Response body
```json
	{  
		"response":  "Luis actualizado correctamente"  
	}
```

### DELETE
Request body
```json
	http://localhost:8000/personaService/?id=51
```
Response body
```json
	{  
		"response":  "Borrado éxistoso"  
	}
```

## CRUD areas

### POST
Request body
```json
	{
		"descripcion":"desarrollo",
		"responsable":93
	}
```
Response body
```json
	{  
		"response":  "desarrollo guardado éxitosamente"  
	}
```

### GET
Request body
```json
	http://localhost:8000/areaService/
```
Response body
```json
	{  
		"response":  [  
						{  
							"id":  35,  
							"descripcion":  "desarrollo",
							"responsable":  {  
												"id":  93,
												"telefono":  "4567890"  
											}  
						}  
					]  
	}
```

### PUT
Request body
```json
	 {
            "id": 35,
            "descripcion": "Desarrollo Tecnológico",
            "responsable":  93
     }
```
Response body
```json
	{  
		"response":  "Desarrollo Tecnológico actualizado correctamente"  
	}
```

### DELETE
Request body
```json
	http://localhost:8000/areaService/?id=35
```
Response body
```json
	{  
		"response":  "Borrado éxistoso"  
	}
```

## CRUD recurso

### POST
Request body, marca, proveedor, estado y tipo corresponden a los id de los registros previamente creados.
```json
	{
           "descripcion":"Recurso_1",
           "serial":"SER001",
           "valor":"456000",
           "fecha_compra":"2019-10-11",
           "marca": 19,
           "proveedor" : 10,
           "estado":8,
           "tipo": 7
	}
```
Response body
```json
	{  
		"response":  "Recurso_1 creado con éxito"  
	}
```

### GET
Request body
puede filtrar el conjunto de resultados enviando como parámetro en la url el id de el serial o tipo o marca
```json
	http://localhost:8000/recursoService/
	http://localhost:8000/recursoService/?serial=SER001
	http://localhost:8000/recursoService/?tipo=7
	http://localhost:8000/recursoService/?marca=19
	
```
Response body
```json
{  
		"response":  [  
						{  
							"id":  16,  
							"descripcion":  "Recurso_1",
							"serial":  "SER001",  
							"valor":  "456000",  
							"fecha_compra":  "2019-10-11",  
							"marca":  {  
										"id":  19,
										"descripcion":  "Marca_1"  
									   },  
							"proveedor":  {  
											"id":  10,
											"descripcion":  "Proveedor_1"  
										   },  
							"estado":  {  
										"id":  8,  
										"descripcion":  "Nuevo"  
										},  
							"tipo":  {  
										"id":  7,  
										"descripcion":  "Tecnológico"  
									  }  
						}  
					]  
	}
```

### PUT
Request body
```json
	{
           "id": 16,
           "descripcion": "Recurso_1_actualizado",
           "serial": "SER001",
           "valor": "455000",
           "fecha_compra": "2019-10-14",
           "marca": 19,
           "proveedor": 10,
           "estado": 8,
           "tipo": 7
     }
```
Response body
```json
	{  
		"response":  "Recurso_1_actualizado recurso actualizado"  
	}
```

### DELETE
Request body
```json
	http://localhost:8000/recursoService/?id=16
```
Response body
```json
	{  
		"response":  "borrado éxitoso"  
	}
```

## CRUD asignar

### POST
Request body
```json
	{
	    "recurso":18,
	    "responsable":92,
	    "fecha_asignado":"2019-11-11"
	}
```
Response body
```json
	{  
		"response":  "recurso asignado"  
	}
```

### GET
Request body
```json
	http://localhost:8000/asignaService/
```
Response body
```json
	{  
		"response":  [  
						{  "recurso":  18,  
							"responsable":  92,  
							"fecha_asignacion":  "2019-11-11"  
						}  
					]  
	}
```

### PUT
Request body
```json
	{  
		"recurso":  18,  
		"responsable":  92, 
		"fecha_asignacion":  "2019-10-01"  
	}
```
Response body
```json
	{  
		"response":  "actualización éxitosa"  
	}
```

### DELETE
Request body
```json
http://localhost:8000/asignaService/?recurso=18&responsable=92
```
Response body
```json
	{  
		"response":  "borrado éxitoso"  
	}
```


