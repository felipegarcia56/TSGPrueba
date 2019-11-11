from django.db import IntegrityError
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *


class RecursoService(APIView):

    def get(self,request):
        try:
            resp = []
            serial_ = request.query_params.get("serial",None)
            tipo_ = request.query_params.get("tipo",None)
            marca_ = request.query_params.get("marca",None)

            if serial_ is not None:
                recursos= Recurso.objects.filter(serial=serial_)
            elif tipo_ is not None:
                recursos= Recurso.objects.filter(id_tipo=tipo_)
            elif marca_ is not None:
                recursos= Recurso.objects.filter(id_marca=marca_)
            else:
                recursos = Recurso.objects.all()

            if len(recursos)>0:
                for recurso in recursos:
                    marca = {"id":recurso.id_marca.id,"descripcion":recurso.id_marca.descripcion}
                    proveedor = {"id":recurso.id_proveedor.id,"descripcion":recurso.id_proveedor.descripcion}
                    estado = {"id":recurso.id_estado.id,"descripcion":recurso.id_estado.descripcion}
                    tipo = {"id":recurso.id_tipo.id,"descripcion":recurso.id_tipo.descripcion}
                    resp.append({"id":recurso.id,"descripcion":recurso.descripcion,
                                 "serial":recurso.serial,"valor":recurso.valor,
                                 "fecha_compra":recurso.fecha_compra, "marca":marca,
                                 "proveedor":proveedor,"estado":estado,"tipo":tipo})
                return Response({"response":resp},200)
            else:
                return Response({"response":"no hay datos"},404)
        except Exception as e:
            return Response({"error":e},500)

    def post(self,request):
        try:
            data = request.data
            if "descripcion" in data.keys() and "serial" in data.keys() and "valor" in data.keys() and "fecha_compra" in data.keys() and "marca" in data.keys() and "proveedor" in data.keys() and "estado" in data.keys() and "tipo" in data.keys():
                if data["serial"] =="" or data["descripcion"]=="" or data["valor"] == "" or data["fecha_compra"] == "" or data["marca"] == "" or data["proveedor"] =="" or data["estado"]=="" or data["tipo"]=="":
                    raise ValueError()
                marca = Marca.objects.filter(id=data["marca"])
                proveedor = Proveedor.objects.filter(id=data["proveedor"])
                estado = Estado.objects.filter(id = data["estado"])
                tipo = TipoRecurso.objects.filter(id=data["tipo"])

                if len(marca)>0 and len(proveedor)>0 and len(estado)>0 and len(tipo)>0:
                    recurso = Recurso(descripcion=data["descripcion"],serial=data["serial"],
                                      valor=data["valor"],fecha_compra=data["fecha_compra"],
                                      id_marca=marca[0],id_proveedor=proveedor[0], id_estado=estado[0],
                                      id_tipo=tipo[0])

                    recurso.save()
                    return Response({"response":"{} creado con éxito".format(data["descripcion"])},200)
                else:
                    return Response({"error":"no se encontraron los datos necesarios verifique la información"},404)
            else:
                return Response({"response":"todos los parametros son requeridos"},400)
        except ValueError:
            return Response({"error":"verifique los datos"},500)
        except IntegrityError:
            return Response({"error":"hubo un error, verifique que el serial no sea un serial existente"},500)
        except Exception as e:
            return Response({"error":e},500)

    def put(self,request):
        try:
            data = request.data
            if "id" in data.keys() and "descripcion" in data.keys() and "serial" in data.keys() and "valor" in data.keys() and "fecha_compra" in data.keys() and "marca" in data.keys() and "proveedor" in data.keys() and "estado" in data.keys() and "tipo" in data.keys():
                if data["serial"] =="" or data["descripcion"]=="" or data["valor"] == "":
                    raise ValueError()

                marca = Marca.objects.filter(id=data["marca"])[0]
                proveedor = Proveedor.objects.filter(id=data["proveedor"])[0]
                estado = Estado.objects.filter(id=data["estado"])[0]
                tipo = TipoRecurso.objects.filter(id=data["tipo"])[0]

                recurso = Recurso(id=data["id"],descripcion=data["descripcion"],
                                  serial=data["serial"],valor=data["valor"],
                                  fecha_compra=data["fecha_compra"],id_marca=marca,
                                  id_proveedor=proveedor, id_estado=estado,
                                  id_tipo=tipo)
                recurso.save()
                return Response({"response":"{} recurso actualizado".format(data["descripcion"])},200)
            else:
                return Response({"response":"Se requieren todos los parametros"},400)
        except ValueError:
            return Response({"error":"verifique los datos"},500)
        except IntegrityError:
            return Response({"error":"hubo un error, verifique que el serial no sea un serial existente"},500)
        except Exception as e:
            return Response({"error":e},500)

    def delete(self,request):
        try:
            data = request.query_params.get("id",None)
            if data is not None:
                recurso = Recurso.objects.filter(id=data)
                if len(recurso)>0:
                    recurso.delete()
                    return Response({"response":"borrado éxitoso"},200)
                else:
                    return Response({"response":"no se encontraron registros"},404)
            else:
                return Response({"response":"todos los parametros son requeridos"},400)
        except Exception as e:
            return Response({"error":e},500)