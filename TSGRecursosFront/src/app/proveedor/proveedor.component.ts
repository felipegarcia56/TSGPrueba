import { Component, OnInit } from '@angular/core';
import { ServicesClientService } from '../services/services-client.service';
import { Proveedor } from '../model/proveedor';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

	proveedores: any[] = [];
	proveedorUrl: string ="proveedorService/";
	createForm;

	constructor(
			protected serviceClientService: ServicesClientService,
			private formBuilder: FormBuilder
		) { 

		this.createForm = this.formBuilder.group({
		  descripcion: ''
		});
	}

	ngOnInit() {
		this.cargarProveedores();
	}

	cargarProveedores(){
		this.serviceClientService.getRequest(this.proveedorUrl)
		.subscribe(
			(data)=>{
				this.proveedores = [];
				let response = data["response"];
				
				for(let i = 0; i < response.length; i++){
					this.proveedores.push(new Proveedor(response[i]["id"],response[i]["descripcion"]));
				}
			},(error)=>{
				console.log(error);
			}
		)
	}

	crearProveedores(formData){
		this.serviceClientService.postRequest(formData,this.proveedorUrl)
		.subscribe(
			(data)=>{
				this.cargarProveedores();
				this.createForm.reset();
			},(error)=>{
				alert(error["error"][1]);
				console.log(error);
			}
		)

	}
	
	actualizarProveedores(id:number,descripcion:string){
		let proveedor = new Proveedor(id,descripcion);
		
		this.serviceClientService.putRequest(proveedor,this.proveedorUrl)
		.subscribe(
			(data)=>{
				this.cargarProveedores();
			},(error)=>{
				alert(error["error"][1]);
				console.log(error);
			}
		)
	}
	
	borrarProveedores(id:number){
		this.serviceClientService.deleteRequest({"id":id},this.proveedorUrl)
		.subscribe(
			(data)=>{
				this.cargarProveedores();
			},(error)=>{
				alert(error["error"]["error"]);
				console.log(error);
			}
		)
	}

}
