from django.db import IntegrityError
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *


class ResponsableService(APIView):


    def get(self,request):
        try:
            resp = []
            responsables = Responsable.objects.all()
            if len(responsables) > 0:
                for responsable in responsables:
                    resp.append({"id":responsable.id,"telefono":responsable.telefono})

                return Response({"response":resp},200)
            else:
                return Response({"success":"no se encontraron datos"},200)
        except Exception as e:
            return Response({"error":e},500)

    def post(self,request):
        try:
            data = request.data
            if "telefono" in data.keys():

                if(data["telefono"] == ""):
                    raise ValueError;

                responsable = Responsable(telefono=data["telefono"])
                responsable.save()
                resp = {"response":{"mensaje":"{} creado con éxito".format(data["telefono"]),
                                    "id":Responsable.objects.latest('id').id}
                        }
                return Response(resp,200)
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},400)
        except ValueError:
            return Response({"error":"verifique los datos"},500)
        except Exception as e:
            return Response({"error": e}, 500)

    def put(self,request):
        try:
            data = request.data
            if "id" in data.keys() and "telefono" in data.keys():
                if(data["telefono"] == ""):
                    raise ValueError;

                responsable = Responsable.objects.filter(id = data["id"])
                if len(responsable)>0:
                    resp = responsable[0]
                    resp.telefono = data["telefono"]
                    resp.save()
                    return Response({"response":"actualizado con éxito"},200)
                else:
                    return Response({"response":"no se encontraron registros para actualizar"},404)
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},400)
        except ValueError:
            return Response({"error":"verifique los datos"},500)
        except Exception as e:
            return Response({"error": e}, 500)

    def delete(self,request):
        try:
            data = request.query_params.get("id",None)
            if data is not None:
                responsable = Responsable.objects.filter(id=data)
                if len(responsable)>0:
                    responsable.delete()
                    return Response({"response":"Borrado éxitoso"},200)
                else:
                    return Response({"response":"no se encontraron registros para borrar"},404)
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},400)
        except IntegrityError:
            return Response({"error":"error de integridad, asegurese de no tener recursos asignados"},500)
        except Exception as e:
            return Response({"error": e}, 500)
