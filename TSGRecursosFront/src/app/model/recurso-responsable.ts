import { Recurso } from './recurso';
import { Responsable} from './responsable';


export class RecursoResponsable {
	recurso:Recurso;
	responsable:Responsable;
	fechaAsignado:string;

	constructor(recurso:Recurso,responsable:Responsable,fechaAsignado:string){
		this.recurso = recurso;
		this.responsable = responsable;
		this.fechaAsignado = fechaAsignado;
	}

	setRecurso(recurso:Recurso){
		this.recurso=recurso;
	}
	setResponsable(responsable:Responsable){
		this.responsable = responsable;
	}
	setFechaAsignado(fechaAsignado:string){
		this.fechaAsignado=fechaAsignado;
	}
}
