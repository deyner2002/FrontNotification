import { Component, OnInit } from '@angular/core';
import {Template} from '../../services/communication/communication.model';
import {CommunicationService} from '../../services/communication/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templatelist',
  templateUrl: './templatelist.component.html',
  styleUrls: ['./templatelist.component.scss']
})
export class TemplatelistComponent implements OnInit {
  templates: Template[] = []; 
  constructor(private communicationService: CommunicationService, private router: Router) { }

  ngOnInit(): void {
    //debugger;
    this.communicationService.getTemplates().subscribe(templates => {
      console.log(templates);
      this.templates = templates;
    });
    //console.log(this.templates);
  }
  
modifyTemplate(template: Template){

}

deleteTemplate(numberId: number){
  this.communicationService.deleteTemplate(numberId).subscribe(
    response => {
      console.log("El template se eliminó correctamente:", response);
    },
    error => {
      console.error("Error al eliminar el template:", error);
    }
  );
}

}
