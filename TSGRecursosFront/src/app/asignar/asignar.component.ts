import { Component, OnInit } from '@angular/core';
import { Recurso } from '../model/recurso';
import { RecursoResponsable } from '../model/recurso-responsable';
import { FormBuilder } from '@angular/forms';
import { ServicesClientService } from '../services/services-client.service';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {

	createForm;
	recResp:any[]=[];
	recursos:any[]=[];
	responsables:any[]=[];
	personas:any[]=[];
	areas:any[]=[];
	asignados:any[]=[];

	recResUrl: string ="asignaService/";
	recursoUrl: string ="recursoService/";
	responsableUrl: string ="responsableService/";
	personUrl: string ="personaService/";
  	areaUrl: string ="areaService/";
	
	constructor(
		protected servicesClientService: ServicesClientService,
		private formBuilder: FormBuilder
	) { 
		this.createForm = this.formBuilder.group({
			recurso:"",
			responsable:"",
			fecha_asignado:""
		}) 
	}

	ngOnInit() {
		this.obtenerAsignados();
	}

	obtenerAsignados(){
		let recursosPormesa = this.cargarDatos(this.recursoUrl);
		let responsablePromesa = this.cargarDatos(this.responsableUrl);
		let areaPromesa = this.cargarDatos(this.areaUrl);
		let personaPromesa = this.cargarDatos(this.personUrl);
		let asignadosPromesa = this.cargarDatos(this.recResUrl);

		Promise.all([recursosPormesa,responsablePromesa,areaPromesa,personaPromesa,asignadosPromesa]).then((data)=>{
			this.recursos = data[0]["response"];
			this.responsables = data[1]["response"];
			this.areas = data[2]["response"];
			this.personas = data[3]["response"];
			this.asignados = data[4]["response"];
			this.obtenerResponsables();

		})
	}


	crearAsignacion(formData){
		this.servicesClientService.postRequest(formData,this.recResUrl)
		.subscribe(
			(data)=>{
				this.obtenerAsignados();
				this.createForm.reset();
			},(error)=>{
				alert(error["error"]["error"]);
				console.log(error);
			}
		)
	}

	cargarDatos(url:string){
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

	actualizarAsignacion(asignado:any){
		this.servicesClientService.putRequest(asignado,this.recResUrl)
		.subscribe(
			(data)=>{
				console.log(data);
				this.obtenerAsignados();
			},(error)=>{
				console.log();
			}
		)
	}

	borrarAsignacion(recursoId:any,responsableId:any,url:string){

		this.servicesClientService.deleteRequest({"recurso":recursoId,"responsable":responsableId},this.recResUrl)
		.subscribe(
			(data)=>{
				this.obtenerAsignados();
			},(error)=>{
				console.log(error);
			}
		)

	}

	obtenerResponsables(){
		
		let temp = {};
		this.recResp =[];

		for (let i = 0; i < this.personas.length; i++) {
			temp = {"id":this.personas[i]["responsable"]["id"], "valor": this.personas[i]["apellido"]+this.personas[i]["nombre"]};
			if(this.recResp.indexOf(temp) == -1)
				this.recResp.push(temp);
		}

		for (let j = 0; j < this.areas.length; j++) {
			temp = {"id":this.areas[j]["responsable"]["id"], "valor": this.areas[j]["descripcion"]};
			if(this.recResp.indexOf(temp) == -1)
				this.recResp.push(temp);
		}

	}





}
