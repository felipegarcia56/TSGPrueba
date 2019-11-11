import { Component, OnInit } from '@angular/core';
import { ServicesClientService } from './services/services-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'TSGRecursosFront';
  
  	constructor(
    	protected servicesClientService: ServicesClientService
  	) {}

  	ngOnInit() {
  	}
}