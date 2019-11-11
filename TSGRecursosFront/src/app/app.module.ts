import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicesClientService } from './services/services-client.service';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcaComponent } from './marca/marca.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { TipoComponent } from './tipo/tipo.component';
import { EstadoComponent } from './estado/estado.component';
import { ResponsableComponent } from './responsable/responsable.component';
import { RecursoComponent } from './recurso/recurso.component';
import { AsignarComponent } from './asignar/asignar.component';
import { ParametrosGeneralesComponent } from './parametros-generales/parametros-generales.component';


@NgModule({
  declarations: [
    AppComponent,
    MarcaComponent,
    ProveedorComponent,
    TipoComponent,
    EstadoComponent,
    ResponsableComponent,
    RecursoComponent,
    AsignarComponent,
    ParametrosGeneralesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ServicesClientService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
