from django.shortcuts import render
from psycopg2._psycopg import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *


class PersonaService(APIView):

    def get(self,request):
        try:
            resp = []
            id_resp = request.query_params.get("idResp",0)
            if id_resp != 0:
                personas = Persona.objects.filter(id_responsable=id_resp)
            else:
                personas = Persona.objects.all()

            if len(personas)>0:
                for persona in personas:
                    responsable = {"id":persona.id_responsable.id,"telefono":persona.id_responsable.telefono}
                    resp.append({"id":persona.id,"nombre":persona.nombre,"apellido":persona.apellido,"responsable":responsable})
                return Response({"response":resp},200)
            else:
                return Response({"response":"no se encontraron registros"})
        except Exception as e:
            return Response({"error":e},500)

    def post(self,request):
        try:
            data = request.data
            print(data)
            if "nombre" in data.keys() and "apellido" in data.keys()  and "responsable" in data.keys():
                responsable = Responsable.objects.filter(id=data["responsable"])
                if len(responsable)>0:
                    persona = Persona(nombre=data["nombre"], apellido=data["apellido"],id_responsable=responsable[0])
                    persona.save()
                    return Response({"response":"{} {} guardado éxitosamente".format(data["nombre"],data["apellido"])},200)
                else:
                    return Response({"response":"el responsable {} no existe".format(data["responsable"])},400)
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},404)
        except IntegrityError:
            return Response({"error":"error de integridad "+request.data},500)
        except Exception as e:
            return Response({"error":e},500)

    def put(self,request):
        try:
            data = request.data
            if "id" in data.keys() and "nombre" in data.keys() and "apellido" in data.keys() and "responsable" in data.keys():
                responsable = Responsable.objects.filter(id=data["responsable"])
                persona = Persona.objects.filter(id=data["id"])
                if len(responsable)>0 and len(persona)>0:
                    personaUpdt = Persona(id=data["id"], nombre=data["nombre"], apellido=data["apellido"],id_responsable=responsable[0])
                    personaUpdt.save()
                    return Response({"response":"{} actualizado correctamente".format(data["nombre"])},200)
                else:
                    return Response({"response":"verifique la persona y el responsable existan"},404)
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},400)

        except Exception as e:
            return Response({"error":e})

    def delete(self,request):
        try:
            data = request.query_params.get("id",None)
            if data is not None:
                persona = Persona.objects.filter(id=data)
                if len(persona)>0:
                    persona.delete()
                    return Response({"response":"Borrado éxistoso"},200)
                else:
                    return Response({"response":"no se encontro ningún registro para borrar"},404)
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},400)
        except Exception as e:
            return Response({"error":e},500)