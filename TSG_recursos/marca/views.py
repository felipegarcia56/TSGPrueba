from django.db import IntegrityError
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from django.http import Http404


class MarcaService(APIView):

    def get(self,request):
        try:
            resp = []
            marcas = Marca.objects.all()
            for marca in marcas:
                resp.append({"id":marca.id,"descripcion":marca.descripcion})

            return Response({"response":resp},200)
        except Exception as e:
            return Response({"error":e},500)

    def post(self,request):
        try:
            data = request.data

            if "descripcion" in data.keys():
                if data["descripcion"] == "":
                    raise ValueError
                marca = Marca(descripcion=data["descripcion"])
                marca.save()
                return Response({"success":"{} agregada exitosamente".format(data["descripcion"])},200)
            else:
                return Response({"error":"no se encontro la descripcion de la marca"},400)
        except ValueError:
            return Response({"error","verifique los datos"},500);
        except Exception as e:
            return Response({"error":e},500)

    def put(self,request):
        try:
            data = request.data
            if "id" in data.keys() and "descripcion" in data.keys():
                if data["descripcion"] == "":
                    raise ValueError
                marca = Marca.objects.filter(id=data["id"])[0]
                marca.descripcion = data["descripcion"]
                marca.save()
                return Response({"success":"{} actualizada correctamente".format(data["descripcion"])},200)
            else:
                return Response({"error":"datos incorrectos"},400)

        except ValueError:
            return Response({"error", "verifique los datos"}, 500);
        except Exception as e:
            return Response({"error":e},500)

    def delete(self,request):
        try:
            id_ = request.query_params.get("id",None)
            if id_ is not None:
                marca = Marca.objects.filter(id=id_)
                if len(marca) == 0:
                    return Response({"error":" marca no encontrada"},404)
                else:
                    marca.delete()
                    return Response({"success":" borrado correctamente"},200)
            else:
                return Response({"error":"datos incorrectos"},400)
        except IntegrityError:
            return Response({"error":"error de integridad, verifique los recursos creaos"},500)
        except Exception as e:
            return Response({"error":e},500)
