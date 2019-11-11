export class Marca {
	id: number;
	descripcion:string;

	constructor(id:number,descripcion:string){
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
