from django.db import models

from responsable.models import Responsable


class Persona(models.Model):
    nombre = models.CharField(max_length=200)
    apellido = models.CharField(max_length=200)
    id_responsable = models.ForeignKey(Responsable, models.CASCADE, db_column='id_responsable', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'persona'
