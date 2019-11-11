import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServicesClientService } from '../services/services-client.service';
import { Recurso } from '../model/recurso';
import { Responsable } from '../model/responsable';
import { TipoRecurso } from '../model/tipo-recurso';
import { Estado } from '../model/estado';
import { Marca } from '../model/marca';
import { Proveedor } from '../model/proveedor';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})
export class RecursoComponent implements OnInit {

	recursos:any[]=[];
	createForm;
	recursoUrl: string ="recursoService/";
	marcaUrl: string ="marcaService/";
	estadoUrl: string ="estadoService/";
	proveedorUrl: string ="proveedorService/";
	tipoRecUrl: string ="tipoRService/";
	
	marcas:any[]=[];
	proveedores:any[]=[];
	estados:any[]=[];
	tipos:any[]=[];
	
	serFilter:string="";
	tipoFilter:string="";
	marcaFilter:string=	"";

	constructor(
		protected servicesClientService:ServicesClientService,
		private formBuilder:FormBuilder,

	) { 
		this.createForm = this.formBuilder.group({
			descripcion:"",	
			serial:"",
			valor:"",
			fecha_compra:"",
			marca:"",
			proveedor:"",
			estado:"",
			tipo:""
		})
	}

	ngOnInit() {
		this.obtenerRecursos();	
	}

	obtenerRecursos(){
		let obtenerMarca:any;
		let obtenerProveedor:any;
		let obtenerEstado:any;
		let obtenerTipo:any; 
		let promesas:any[]=[];
		this.serFilter="";
		this.tipoFilter="";
		this.marcaFilter="";

		obtenerMarca = this.obtenerRegAsociados(this.marcaUrl);
		obtenerEstado = this.obtenerRegAsociados(this.estadoUrl);
		obtenerProveedor = this.obtenerRegAsociados(this.proveedorUrl);
		obtenerTipo = this.obtenerRegAsociados(this.tipoRecUrl);
		promesas.push(obtenerMarca,obtenerEstado,obtenerProveedor,obtenerTipo);
		Promise.all(promesas).then((data)=>{
			this.marcas = data[0]["response"];
			this.estados = data[1]["response"];
			this.proveedores = data[2]["response"];
			this.tipos = data[3]["response"];
			this.obtenerTabla();
		});
	}

	obtenerTabla(params={}){
		this.servicesClientService.getRequest(this.recursoUrl,params)
		.subscribe(
			(data)=>{
				this.recursos = [];
				let response = data["response"];
				let rec:Recurso;
				for(let i=0;i<response.length;i++){
					rec = response[i];
					this.recursos.push(rec);
				}
			},(error)=>{
				console.log(error);
			}
		);	
	}

	crearRecursos(formData:any){
		console.log(formData);
		this.servicesClientService.postRequest(formData,this.recursoUrl)
		.subscribe(
			(data)=>{
				this.obtenerRecursos();
				this.createForm.reset();
			},(error)=>{
				alert(error["error"]["error"]);
				console.log(error);
			}
		)
	}

	actualizarRecursos(rec:any){
		let body:any={"id":rec["id"],"descripcion":rec["descripcion"],
						"serial":rec["serial"],"valor":rec["valor"],
						"fecha_compra":rec["fecha_compra"],"estado":rec["estado"]["id"],
						"marca":rec["marca"]["id"],"proveedor":rec["proveedor"]["id"],
						"tipo":rec["tipo"]["id"]};
		
		
		this.servicesClientService.putRequest(body,this.recursoUrl)
		.subscribe(
			(data)=>{
				console.log(data);
				this.obtenerRecursos();
			},(error)=>{
				alert(error["error"]["error"]);
				console.log(error);
			}
		)
	}

	borrarRecursos(recId:any){
		this.servicesClientService.deleteRequest({"id":recId},this.recursoUrl)
		.subscribe(
			(data)=>{
				this.obtenerRecursos();
			},(error)=>{
				console.log(error);
			}
		)

	}

	obtenerRegAsociados(url:string){
		let $this = this;
		let promesa = new Promise((resolve,reject)=>{
			$this.servicesClientService.getRequest(url)
			.subscribe(
				(data)=>{
					resolve(data);
				},(error)=>{
					console.log(error);
					reject();
				}

			)
		});
		return promesa;

	}

	filtrarTable(){
		this.recursos = [];
		let param ={};
		
		if(this.serFilter != "")
			param["serial"]=this.serFilter;

		if(this.tipoFilter != "")
			param["tipo"]=this.tipoFilter;

		if(this.marcaFilter != "")
			param["marca"]=this.marcaFilter;


		this.obtenerTabla(param);
	}

}
