from django.db import models

from estado.models import Estado
from marca.models import Marca
from proveedor.models import Proveedor
from responsable.models import Responsable
from tipoRecurso.models import TipoRecurso


class Recurso(models.Model):
    descripcion = models.CharField(max_length=200)
    serial = models.CharField(unique=True, max_length=200)
    valor = models.CharField(max_length=200)
    fecha_compra = models.DateField()
    id_marca = models.ForeignKey(Marca, models.CASCADE, db_column='id_marca')
    id_proveedor = models.ForeignKey(Proveedor, models.CASCADE, db_column='id_proveedor')
    id_estado = models.ForeignKey(Estado, models.CASCADE, db_column='id_estado')
    id_tipo = models.ForeignKey(TipoRecurso, models.CASCADE, db_column='id_tipo')

    class Meta:
        managed = False
        db_table = 'recurso'
