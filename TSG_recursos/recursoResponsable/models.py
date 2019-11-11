from django.db import models

from recurso.models import Recurso
from responsable.models import Responsable


class RecursoResponsable(models.Model):
    id_recurso = models.ForeignKey(Recurso, models.DO_NOTHING, db_column='id_recurso', primary_key=True)
    id_responsable = models.ForeignKey(Responsable, models.DO_NOTHING, db_column='id_responsable')
    fecha_asignacion = models.DateField()

    class Meta:
        managed = False
        db_table = 'recurso_responsable'
        unique_together = (('id_recurso', 'id_responsable'),)
