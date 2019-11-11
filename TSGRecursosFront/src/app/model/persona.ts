import { Responsable } from './responsable';

export class Persona extends Responsable{

	id:number;
	nombre:string;
	apellido:string;
	
	constructor(id:number,nombre:string,apellido:string, idResp:number,telefono:number){
		super(idResp,telefono);
		this.id=id;
		this.nombre = nombre;
		this.apellido = apellido;
	}

	setId(id:number){
		this.id=id;
	}

	setNombre(nombre:string){
		this.nombre = nombre;
	}

	setApellido(apellido:string){
		this.apellido = apellido;
	}


}
