import { Component, OnInit } from '@angular/core';
import { ServicesClientService } from '../services/services-client.service';
import { Responsable } from '../model/responsable';
import { Area } from '../model/area';
import { Persona } from '../model/persona';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent implements OnInit {

	responsablesArr:any[]=[];
	areas:any[]=[];
	personas:any[]=[];
	responsableUrl: string ="responsableService/";
	personUrl: string ="personaService/";
  	areaUrl: string ="areaService/";
  	objResp:any={};
	createForm;
	tipoResp:any[]=[{"tipo":"persona"},{"tipo":"area"}];
	tipoSeleccionado:string="persona";
	
	constructor(
		protected servicesClientService: ServicesClientService,
		private formBuilder:FormBuilder

	) { 
		this.createForm = this.formBuilder.group({
			nombre:"",
			apellido:"",
			descripcion:"",
			telefono:""
		});
	}

	ngOnInit() {
		this.obtenerResponsables();
	}

	deshabilitaCampo(objectTest:any){
		return (objectTest.length > 0);
	}

	obtenerResponsables(){
		this.objResp = {};
		this.responsablesArr =[];
		let promPer = this.obtenerAreas();
		let promAre = this.obtenerPersonas();
		Promise.all([promPer,promAre]).then(()=>{
			for(let registro in this.objResp){
				this.responsablesArr.push(this.objResp[registro]);
			}
		})
	}

	crearRegistro(formData){
		let crearArea:any;
		let crearPersona:any;
		let crearResponsable:any;
		let nuevaPersona:any;
		let nuevaArea:any;
		let nuevoResponsable:Responsable = new Responsable(0,formData["telefono"]);
		let promesas = [];

		crearResponsable = this.crearRegAsociado(nuevoResponsable,this.responsableUrl);
		
		Promise.all([crearResponsable]).then((data)=>{
			let lastId = data[0]["response"]["id"];

			if((formData["nombre"] != "" || formData["apellido"] != "") && (formData["nombre"] != null || formData["apellido"] != null)){
				nuevaPersona = {"nombre":formData["nombre"],"apellido":formData["apellido"],"responsable":lastId};
				crearPersona = this.crearRegAsociado(nuevaPersona,this.personUrl);
				promesas.push(crearPersona);
			}
			if(formData["descripcion"] != "" && formData["descripcion"] != null){
				nuevaArea = {"descripcion":formData["descripcion"],"responsable":lastId};
				crearArea = this.crearRegAsociado(nuevaArea,this.areaUrl);
				promesas.push(crearArea);
			}

			Promise.all(promesas).then(()=>{
				this.obtenerResponsables();
				this.createForm.reset();
			})

		}).catch((error)=>{
			alert(error["error"]["error"]);
			console.log(error);
		});

	}

	actualizarRegistros(responsable:any){
		let actualizarPersona:any;
		let actualizarArea:any;
		let actualizarResponsable:any;
		let promesas:any[] = [];
		
		actualizarResponsable = this.actualiazrRegAsociado(responsable["responsable"],this.responsableUrl);
		promesas.push(actualizarResponsable);

		if(Object.keys(responsable["persona"]).length > 0){
			responsable["persona"]["responsable"] = responsable["responsable"]["id"];
			actualizarPersona = this.actualiazrRegAsociado(responsable["persona"],this.personUrl);
			promesas.push(actualizarPersona);
		}
		if(Object.keys(responsable["area"]).length > 0){
			responsable["area"]["responsable"] = responsable["responsable"]["id"];
			actualizarArea = this.actualiazrRegAsociado(responsable["area"],this.areaUrl);
			promesas.push(actualizarArea);
		}

		Promise.all(promesas).then(()=>{
			this.obtenerResponsables();
		})

	}

	borrarRegistros(responsable:any){
		let borrarResponsable:any;
		borrarResponsable = this.borrarRegAsocioado(responsable["responsable"]["id"],this.responsableUrl); 
		Promise.all([borrarResponsable]).then(()=>{
			this.obtenerResponsables();
		}).catch((error)=>{
			alert(error["error"]["error"]);
		})
	}

	obtenerPersonas(){
		let $this= this;
		let promPer = new Promise(function(resolve,reject){
			$this.servicesClientService.getRequest($this.personUrl)
			.subscribe(
				(data)=>{
					let response = data["response"];
					if(typeof response =="object"){
						for(let p = 0; p<response.length;p++){
							let per = new Persona(response[p]["id"],
													response[p]["nombre"],
													response[p]["apellido"],
													response[p]["responsable"]["id"],
													response[p]["responsable"]["telefono"]);
							$this.personas.push(per);
							
							$this.objResp=$this.llenarObjRes($this.objResp,response[p],"persona");
						}
					}
					resolve();
				},(error)=>{
					console.log(error);
					reject();
				}
			);
		})

		return promPer;
	}

	obtenerAreas(){
		let $this = this;
		let areProm = new Promise(function(resolve,reject){
			$this.servicesClientService.getRequest($this.areaUrl)
			.subscribe(
				(data)=>{
					let response = data["response"];

					if(typeof response =="object"){					
						for(let a = 0; a<response.length;a++){
							$this.areas.push(new Area(response[a]["id"],response[a]["descripcion"],response[a]["responsable"]["id"],response[a]["responsable"]["telefono"]));
							$this.objResp= $this.llenarObjRes($this.objResp,response[a],"area");
						}
					}
					resolve();
				},(error)=>{
					reject();
				}
			)
		});
		return areProm;
	}

	llenarObjRes(objResp:any,responsePos:any,tipo:string){
		
		let key = "resp"+responsePos["responsable"]["id"];
		let responsable:any ={"id":responsePos["responsable"]["id"],"telefono":responsePos["responsable"]["telefono"]};
		let persona:any = {};
		let area:any = {};
		let value:any = {};

		if(tipo =="persona"){
			value = persona = {"id":responsePos["id"],"nombre":responsePos["nombre"],"apellido":responsePos["apellido"]};
			
		}
		if(tipo == "area"){
			value = area = {"id":responsePos["id"],"descripcion":responsePos["descripcion"]};
		}

		if(!objResp[key]){
			objResp[key] = {"responsable":responsable,"persona":persona,"area":area};
		}else{
			objResp[key][tipo] = value;
		}
		return objResp;
	}

	crearRegAsociado(objeto:any, url:string){
		let $this = this;
		let promesa = new Promise((resolve,reject)=>{
			$this.servicesClientService.postRequest(objeto,url)
			.subscribe(
				(data)=>{
					resolve(data);
				},(error)=>{
					console.log(error);
					reject(error);
				}

			)
		});
		return promesa;
	}

	actualiazrRegAsociado(objeto:any, url:string){
		let $this = this;
		let promesa = new Promise((resolve,reject)=>{
			$this.servicesClientService.putRequest(objeto,url)
			.subscribe(
				(data)=>{
					console.log(data);
					resolve(data);
				},(error)=>{
					console.log(error);
					reject();
				}

			)
		});
		return promesa;
	}

	borrarRegAsocioado(id:any,url:string){
		let $this = this;
		let promesa = new Promise((resolve,reject)=>{
			$this.servicesClientService.deleteRequest({"id":id},url)
			.subscribe(
				(data)=>{
					resolve(data);
				},(error)=>{
					console.log(error);
					reject(error);
				}

			)
		});
		return promesa;	
	}

}