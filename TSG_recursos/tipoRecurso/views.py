from django.db import IntegrityError
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *


class TipoRService(APIView):

    def get(self,reques):
        try:
            resp=[]
            tipos = TipoRecurso.objects.all()
            if len(tipos)>0:
                for tipo in tipos:
                   resp.append({"id":tipo.id,"descripcion":tipo.descripcion})
                return Response({"response":resp},200)
            else:
                return Response({"response":"No existen datos."},200)
        except Exception as e:
            return Response({"error":e},500)

    def post(self,request):
        try:
            data = request.data
            if "descripcion" in data.keys():
                if data["descripcion"] == "":
                    raise ValueError

                tipo = TipoRecurso(descripcion=data["descripcion"])
                tipo.save()
                return Response({"response":"{} se creo correctamente".format(data["descripcion"])})
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},400)
        except ValueError:
            return Response({"error", "verifique los datos"}, 500);
        except Exception as e:
            return Response({"error":e},500)

    def put(self,request):
        try:
            data = request.data
            if "id" in data.keys() and "descripcion" in data.keys():
                if data["descripcion"] == "":
                    raise ValueError

                tipo = TipoRecurso.objects.filter(id=data["id"])
                if len(tipo)>0:
                    tipoR =tipo[0]
                    tipoR.descripcion = data["descripcion"]
                    tipoR.save()
                    return Response({"response":"{} actualizado correctamente".format(data["descripcion"])})
                else:
                    return Response({"response":"No se encontraron datos para actualizar"},404)
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},400)
        except ValueError:
            return Response({"error", "verifique los datos"}, 500);
        except Exception as e:
            return Response({"error":e},500)

    def delete(self,request):
        try:
            data = request.query_params.get("id",None)
            if data is not None:
                tipo = TipoRecurso.objects.filter(id=data)
                if len(tipo)>0:
                    tipo.delete()
                    return Response({"response":"Borrado éxitoso"},200)
                else:
                    return Response({"response":"No se encontraron datos para borrar"},404)
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},400)
        except IntegrityError:
            return Response({"error":"error de integridad, verifique los recursos creaos"},500)
        except Exception as e:
            return Response({"error":e},500)