import { Component, OnInit } from '@angular/core';
import { ServicesClientService} from '../services/services-client.service'
import { TipoRecurso } from '../model/tipo-recurso'
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {

	tipos:any[]=[];
	tipoRecUrl: string ="tipoRService/";
	createForm;

	constructor(
		protected servicesClientService:ServicesClientService,
		private formBuilder:FormBuilder,
	) { 
		this.createForm = this.formBuilder.group({
			descripcion:'',
		})
	}

	ngOnInit() {
		this.obtenerTipos();
	}

	obtenerTipos(){
		this.servicesClientService.getRequest(this.tipoRecUrl)
		.subscribe(
			(data) => {
				this.tipos = [];
				let response = data["response"];
				for (let i = 0; i< response.length; i++){
					this.tipos.push(new TipoRecurso(response[i]["id"],response[i]["descripcion"]));
				}
			},(error)=>{
				alert("hubo un error inesperad");
				console.log(error);
			}
		)
	}

	crearTipos(formData){
		this.servicesClientService.postRequest(formData,this.tipoRecUrl)
		.subscribe(
			(data)=>{
				this.obtenerTipos();
			},(error)=>{
				alert(error["error"][1]);
				console.log(error);
			}
		)

	}

	actualizarTipos(id:number,descripcion:string){
		let tipo = new TipoRecurso(id,descripcion);
		console.log(tipo);
		this.servicesClientService.putRequest(tipo,this.tipoRecUrl)
		.subscribe(
			(data)=>{
				this.obtenerTipos();
			},(error)=>{
				alert(error["error"][1]);
				console.log(error);
			}
		);
	}

	borrarTipos(id:number){
		this.servicesClientService.deleteRequest({"id":id},this.tipoRecUrl)
		.subscribe(
			(data)=>{
				this.obtenerTipos();
			},(error)=>{
				alert(error["error"]["error"]);
				console.log(error);
			}
		)

	}
}
