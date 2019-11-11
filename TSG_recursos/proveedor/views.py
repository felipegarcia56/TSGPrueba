from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *


class ProveedorService(APIView):

    def get(self, request):
        try:
            resp = []
            proveedores = Proveedor.objects.all()
            if len(proveedores) > 0:
                for proveedor in proveedores:
                    resp.append({"id":proveedor.id,"descripcion":proveedor.descripcion})
                return Response({"response":resp},200)
            else:
                return Response({"response":"No existen proveedores"})
        except Exception as e:
            return Response({"error": e}, 500)

    def post(self,request):
        try:
            data = request.data
            if "descripcion" in data.keys():
                if data["descripcion"] == "":
                    raise ValueError
                proveedor = Proveedor(descripcion=data["descripcion"])
                proveedor.save()
                return Response({"response":"{} creado con éxito".format(data["descripcion"])},200)
            else:
                return Response({"error":"no se encontro la descripcion"},400)
        except ValueError:
            return Response({"error","verifique los datos"},500)
        except Exception as e:
            return Response({"error": e}, 500)

    def put(self,request):
        try:
            data = request.data
            if "id" in data.keys() and "descripcion" in data.keys():
                if data["descripcion"] == "":
                    raise ValueError

                proveedor = Proveedor.objects.filter(id=data["id"])
                if len(proveedor) > 0:
                    prov = proveedor[0]
                    prov.descripcion = data["descripcion"]
                    prov.save()
                    return Response({"response":"{} actualizado correctamente".format(data["descripcion"])},200)
                else:
                    return Response({"error": "no se encontraron registros para actualizar"}, 404)
            else:
                return Response({"error":"no se encontraron los parametros necesarios"},400)
        except ValueError:
            return Response({"error","verifique los datos"},500)
        except Exception as e:
            return Response({"error": e}, 500)

    def delete(self,request):
        try:
            id_ = request.query_params.get("id",None)
            if id_ is not None:
                proveedor = Proveedor.objects.filter(id=id_)
                if len(proveedor) > 0:
                    proveedor.delete()
                    return Response({"response":"registro borrado correctamente"},200)
                else:
                    return Response({"response":"no se encontraron registros para borrar"},404)
            else:
                return Response({"error":"datos incorrectos"},500)
        except IntegrityError:
            return Response({"error":"error de integridad, verifique los recursos creaos"},500)
        except Exception as e:
            return Response({"error": e}, 500)