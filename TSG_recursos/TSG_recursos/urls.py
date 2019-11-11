"""TSG_recursos URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from area import views as AreaView
from marca import views as MarcaService
from proveedor import  views as ProveedorService
from estado import  views as EstadoService
from tipoRecurso import views as TipoService
from responsable import views as ResponsableService
from persona import views as PersonaService
from recurso import views as RecursoService
from recursoResponsable import views as RecResService

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^areaService/', AreaView.AreasService.as_view()),
    url(r'^marcaService/', MarcaService.MarcaService.as_view()),
    url(r'^proveedorService/', ProveedorService.ProveedorService.as_view()),
    url(r'^estadoService/', EstadoService.EstadoService.as_view()),
    url(r'^tipoRService/', TipoService.TipoRService.as_view()),
    url(r'^responsableService/', ResponsableService.ResponsableService.as_view()),
    url(r'^personaService/', PersonaService.PersonaService.as_view()),
    url(r'^recursoService/', RecursoService.RecursoService.as_view()),
    url(r'^asignaService/', RecResService.RecursoResponsableService.as_view())

]
