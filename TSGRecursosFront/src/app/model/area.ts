import { Responsable } from './responsable';

export class Area extends Responsable{
	id:number;
	descripcion:string;
	
	constructor(id:number,descripcion:string, idResp:number,telefono:number){
		super(idResp,telefono);
		this.id=id;
		this.descripcion = descripcion;
	}

	setId(id:number){
		this.id=id;
	}

	setDescripcion(descripcion:string){
		this.descripcion = descripcion;
	}

}
