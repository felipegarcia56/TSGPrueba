import sys

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from django.http import Http404


class AreasService(APIView):

    def get(self,request):
        try:
            resp = []
            id_resp = request.query_params.get("idResp",0)
            if id_resp != 0:
                areas = Area.objects.filter(id_responsable=id_resp)
            else:
                areas = Area.objects.all()

            if len(areas)>0:
                for area in areas:
                    responsable = {"id":area.id_responsable.id,"telefono":area.id_responsable.telefono}
                    resp.append({"id":area.id,"descripcion":area.descripcion,"responsable":responsable})
                return Response({"response":resp},200)
            else:
                return Response({"response":"no se encontraron registros"})
        except Exception as e:
            return Response({"error":e},500)

    def post(self,request):
        try:
            data = request.data
            if "descripcion" in data.keys() and "responsable" in data.keys():
                responsable = Responsable.objects.filter(id=data["responsable"])
                if len(responsable)>0:
                    area = Area(descripcion=data["descripcion"], id_responsable=responsable[0])
                    area.save()
                    return Response({"response":"{} guardado éxitosamente".format(data["descripcion"])},200)
                else:
                    return Response({"response":"el responsable {} no existe".format(data["responsable"])},400)
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},404)
        except Exception as e:
            return Response({"error":e},500)

    def put(self,request):
        try:
            data = request.data
            if "id" in data.keys() and "descripcion" in data.keys() and "responsable" in data.keys():
                responsable = Responsable.objects.filter(id=data["responsable"])
                area = Area.objects.filter(id=data["id"])
                if len(responsable)>0 and len(area)>0:
                    areaUpdt = Area(id=data["id"], descripcion=data["descripcion"],id_responsable=responsable[0])
                    areaUpdt.save()
                    return Response({"response":"{} actualizado correctamente".format(data["descripcion"])},200)
                else:
                    return Response({"response":"verifique el area y el responsable existan"},404)
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},400)

        except Exception as e:
            return Response({"error":e})

    def delete(self,request):
        try:
            data = request.query_params.get("id",None)
            if data is not None:
                area = Area.objects.filter(id=data)
                if len(area)>0:
                    area.delete()
                    return Response({"response":"Borrado éxistoso"},200)
                else:
                    return Response({"response":"no se encontro ningún registro para borrar"},404)
            else:
                return Response({"response":"no se encontraron los parametros necesarios"},400)
        except Exception as e:
            return Response({"error":e},500)