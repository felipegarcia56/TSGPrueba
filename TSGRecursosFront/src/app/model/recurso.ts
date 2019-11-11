import { Marca } from './marca';
import { Proveedor } from './proveedor';
import { Estado } from './estado';
import { TipoRecurso } from './tipo-recurso';

export class Recurso {

	id:number;
	descripcion:string;
	serial:string;
	valor:number;
	fechaCompra:string;
	marca:Marca;
	proveedor:Proveedor;
	estado:Estado;
	tipo:TipoRecurso;

	constructor(id:number,descripcion:string,serial:string,valor:number,fechaCompra:string,marca:Marca,proveedor:Proveedor,estado:Estado,tipo:TipoRecurso){
		this.id=id;
		this.descripcion=descripcion;
		this.serial=serial;
		this.valor=valor;
		this.fechaCompra=fechaCompra;
		this.marca=marca;
		this.proveedor=proveedor;
		this.estado=estado;
		this.tipo=tipo;	
	}


	setId(id:number){
		this.id=id
	}
	setDescripcion(descripcion:string){
		this.descripcion=descripcion
	}
	setSerial(serial:string){
		this.serial=serial
	}
	setValor(valor:number){
		this.valor=valor
	}
	setFechaCompra(fechaCompra:string){
		this.fechaCompra=fechaCompra
	}
	setMarca(marca:Marca){
		this.marca=marca
	}
	setProveedor(proveedor:Proveedor){
		this.proveedor=proveedor
	}
	setEstado(estado:Estado){
		this.estado=estado
	}
	setTipo(tipo:TipoRecurso){
		this.tipo=tipo
	}

}
