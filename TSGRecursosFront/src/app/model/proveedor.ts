export class Proveedor {
	id:number;
	descripcion:string;

	constructor(id:number,descripcion:string){
		this.id = id;
		this.descripcion = descripcion;
	}

	setId(id:number){
		this.id=id;
	}
	setDescipcion(descripcion:string){
		this.descripcion=descripcion;
	}
}
