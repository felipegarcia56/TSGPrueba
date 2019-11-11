from django.db import models


class Responsable(models.Model):
    telefono = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'responsable'