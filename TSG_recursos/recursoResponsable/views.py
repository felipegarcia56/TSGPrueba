from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *


class RecursoResponsableService(APIView):

    def get(self,request):
        try:
            resp=[]
            recResp_ = RecursoResponsable.objects.all()
            if len(recResp_)>0:
                for recResp in recResp_:
                    resp.append({"recurso":recResp.id_recurso.id,"responsable":recResp.id_responsable.id,"fecha_asignacion":recResp.fecha_asignacion})
                return Response({"response":resp},200)
            else:
                return Response({"response":"no hay datos"},404)
        except Exception as e:
            return Response({"error":e},500)

    def post(self,request):
        try:
            data = request.data
            if "recurso" in data.keys() and "responsable" in data.keys() and "fecha_asignado" in data.keys():
                recurso = Recurso.objects.filter(id=data["recurso"])
                responsable = Responsable.objects.filter(id=data["responsable"])
                if len(recurso)>0 and len(responsable)>0:
                    rec = recurso[0]
                    resp = responsable[0]
                    recResp = RecursoResponsable(id_recurso=rec,id_responsable=resp,fecha_asignacion=data["fecha_asignado"])
                    recResp.save()

                    return Response({"response":"recurso asignado"},200)
                else:
                    return Response({"response":"no existe el recurso o el responsable indicado"},404)
            else:
                return Response({"response":"todos los parametros son requeridos"},400)
        except ValueError:
            return Response({"error":"verifique los datos"},500)
        except Exception as e:
            return Response({"error":e},500)

    def put(self,request):
        try:
            data = request.data
            if "recurso" in data.keys() and "responsable" in data.keys() and "fecha_asignacion" in data.keys():
                recurso = Recurso.objects.filter(id=data["recurso"])
                responsable = Responsable.objects.filter(id=data["responsable"])
                if len(recurso)>0 and len(responsable)>0:
                    recResp = RecursoResponsable(id_recurso=recurso[0],
                                                 id_responsable=responsable[0],
                                                 fecha_asignacion=data["fecha_asignacion"])
                    recResp.save()
                    return Response({"response":"actualización éxitosa"},200)
                else:
                    return Response({"response":"el recurso o el responsable no existe"},404)
            else:
                return Response({"response":"todos los parametros son requeridos"},400)
        except ValueError:
            return Response({"error":"verifique los datos"},500)
        except Exception as e:
            return Response({"error":e},500)

    def delete(self,request):
        try:
            recurso_ = request.query_params.get("recurso",None)
            responsable_ = request.query_params.get("responsable",None)

            if recurso_ is not None and responsable_ is not None:
                recurso = Recurso.objects.filter(id=recurso_)
                responsable = Responsable.objects.filter(id=responsable_)
                if len(recurso)>0 and len(responsable) >0:
                    recResp = RecursoResponsable.objects.filter(id_recurso=recurso[0],id_responsable=responsable[0])
                    if len(recResp)>0:
                        recResp.delete()
                        return Response({"response":"borrado éxitoso"},200)
                    else:
                        return Response({"response":"la asignación no éxiste"},404)
                else:
                    return Response({"response":"el recurso o responsable no existe"},404)
            else:
                return Response({"response":"se requieren todos los parametros"},400)

        except Exception as e:
            return Response({"error":e},500)

