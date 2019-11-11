import { Component, OnInit } from '@angular/core';
import { ServicesClientService } from '../services/services-client.service';
import { Estado } from '../model/estado';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
	
	estados:any[]=[];
	estadoUrl: string ="estadoService/";
	createForm;	

	constructor(
		protected servicesClientService:ServicesClientService,
		private formBuilder:FormBuilder
	) { 

		this.createForm = this.formBuilder.group({
			descripcion:''
		})
	}

	ngOnInit() {
		this.obtenerEstados();
	}

	obtenerEstados(){
		this.servicesClientService.getRequest(this.estadoUrl)
		.subscribe(
			(data)=>{
				this.estados = [];
				let response = data["response"];
				for(let i=0;i<response.length;i++){
					this.estados.push(new Estado(response[i]["id"],response[i]["descripcion"]));
				}
			},(error)=>{
				console.log(error);
			}
		)
	}

	crearEstados(estado:Estado){
		this.servicesClientService.postRequest(estado,this.estadoUrl)
		.subscribe(
			(data)=>{
				this.obtenerEstados();
			},(error)=>{
				alert(error["error"]["error"]);
				console.log(error);
			}
		)
	}

	actualizarEstados(id:number,descripcion:string){
		let estado = new Estado(id,descripcion);
		this.servicesClientService.putRequest(estado,this.estadoUrl)
		.subscribe(
			(data)=>{
				this.obtenerEstados();
			},(error)=>{
				alert(error["error"]["error"]);
				console.log(error);
			}
		)
	}

	borrarEstados(id:number){
		this.servicesClientService.deleteRequest({"id":id},this.estadoUrl)
		.subscribe(
			(data)=>{
				this.obtenerEstados();
			},(error)=>{
				alert(error["error"]["error"]);
				console.log(error);
			}
		)
	}

}
