export class Responsable {
	id:number;
	telefono:number;

	constructor(id:number,telefono:number){
		this.id=id;
		this.telefono=telefono;
	}

	setId(id:number){
		this.id=id;
	}
	setTelefono(telefono:number){
		this.telefono=telefono;
	}

}
