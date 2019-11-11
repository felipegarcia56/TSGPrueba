import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesClientService {

	hostREST: string = 'http://127.0.0.1:8000/';
  	headers: any = {headers: new HttpHeaders().set('Content-Type','application/json')};
  	constructor(protected http: HttpClient) { }

	getRequest(uri:string, uriParam:any={}){
		return this.http.get(this.hostREST+uri,{params:uriParam});
	}

	postRequest(body: any, uri:string) {
		let json = JSON.stringify(body);
		return this.http.post(this.hostREST+uri,json,this.headers);
	}

	putRequest(body: any, uri:string){
		let json = JSON.stringify(body);
		return this.http.put(this.hostREST+uri,json,this.headers);
	}

	deleteRequest(uriParam: any, uri:string){
		return this.http.delete(this.hostREST+uri,{params:uriParam});	
	}
}
