import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursoComponent } from './recurso/recurso.component';
import { AsignarComponent } from './asignar/asignar.component';
import { ResponsableComponent } from './responsable/responsable.component';
import { ParametrosGeneralesComponent } from './parametros-generales/parametros-generales.component'

const routes: Routes = [
	{ path: '', redirectTo: '/recursos', pathMatch: 'full' },
	{ path: 'recursos', component: RecursoComponent },
	{ path: 'parametrosGenerales', component: ParametrosGeneralesComponent },
	{ path: 'asignar', component: AsignarComponent },
	{ path: 'responsables', component: ResponsableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
