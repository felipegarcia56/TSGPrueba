import { Component, OnInit } from '@angular/core';
import { ServicesClientService } from '../services/services-client.service';
import { Marca } from '../model/marca';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

	marcas: any[]=[];
	marcaUrl: string ="marcaService/";
	createForm;

	constructor(
		protected servicesClientService: ServicesClientService,
		private formBuilder: FormBuilder,
	) { 

		this.createForm = this.formBuilder.group({
	      descripcion: ''
	    });
	}

	ngOnInit() {
		this.obtenerMarcas();
	}

	obtenerMarcas(){
		this.servicesClientService.getRequest(this.marcaUrl)
		.subscribe(
			(data)=>{
				this.marcas = [];
				let response = data['response'];
				for(let i = 0; i<response.length;i++){
					this.marcas.push(new Marca(response[i]["id"],response[i]["descripcion"]));
				}
			},(error)=>{
				console.log(error);
			}
		)
	}

	crearMarcas(formData){
		this.servicesClientService.postRequest(formData,this.marcaUrl)
		.subscribe(
			(data)=>{
				this.obtenerMarcas();
				this.createForm.reset();
			},(error)=>{
				alert(error["error"][1]);
				console.log(error);
			}
		)
	}

	actualizarMarcas(id:number,descripcion:string){
		let marca = new Marca(id,descripcion);
		this.servicesClientService.putRequest(marca,this.marcaUrl)
		.subscribe(
			(data)=>{
				this.obtenerMarcas();
			},(error)=>{
				alert(error["error"][1]);
				console.log(error);
			}
		)
	}

	borrarMarcas(id:number){
		this.servicesClientService.deleteRequest({"id":id},this.marcaUrl)
		.subscribe(
			(data)=>{
				this.obtenerMarcas();
			},(error)=>{
				alert(error["error"]["error"]);
				console.log(error);
			}
		)	
	}
}
