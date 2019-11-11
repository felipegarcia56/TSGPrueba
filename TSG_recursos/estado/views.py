from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *


class EstadoService(APIView):

    def get(self,request):
        try:
            resp = []
            estados = Estado.objects.all()
            if len(estados)>0:
                for estado in estados:
                    resp.append({"id":estado.id,"descripcion":estado.descripcion})
                return Response({"response":resp},200)
            else:
                return Response({"response":"no hay datos"})
        except Exception as e:
            return Response({"error": e}, 500)

    def post(self,request):
        try:
            data = request.data
            if "descripcion" in data:
                if data["descripcion"] == "":
                    raise ValueError

                estado = Estado(descripcion=data["descripcion"])
                estado.save()
                return Response({"response":"{} creado con éxito".format(data["descripcion"])},200)
            else:
                return Response({"response":"no se encontraron los parametros"},400)
        except ValueError:
            return Response({"error":"verifique los datos"},500)
        except Exception as e:
            return Response({"error": e}, 500)

    def put(self,request):
        try:
            data = request.data
            if "id" in data.keys() and "descripcion" in data.keys():
                if data["descripcion"] == "":
                    raise ValueError

                estado = Estado.objects.filter(id=data["id"])
                if len(estado) > 0:
                    est = estado[0]
                    est.descripcion = data["descripcion"]
                    est.save()
                    return Response({"response":"{} actualizado con éxito".format(data["descripcion"])},200)
                else:
                    return Response({"response":"no se encontraron registros que actualizar"},404)
            else:
                return Response({"response":"parametros incorrectos"},400)
        except ValueError:
            return Response({"error":"verifique los datos"},500)
        except Exception as e:
            return Response({"error": e}, 500)

    def delete(self,request):
        try:
            data = request.query_params.get("id",None)
            if data is not None:
                estado = Estado.objects.filter(id=data)
                if len(estado)>0:
                    estado.delete()
                    return Response({"response":"registro borrado con éxito"})
                else:
                    return Response({"response": "no se encontraron registros para borrar"}, 400)
            else:
                return Response({"response": "parametros incorrectos"}, 400)
        except IntegrityError:
            return Response({"error":"error de integridad, verifique los recursos creaos"},500)
        except Exception as e:
            return Response({"error": e}, 500)