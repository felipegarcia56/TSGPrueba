from django.db import models


class Marca(models.Model):
    descripcion = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'marca'

# Create your models here.
