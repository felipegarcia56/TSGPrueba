from django.db import models


class Proveedor(models.Model):
    descripcion = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'proveedor'
