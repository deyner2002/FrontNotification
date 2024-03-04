import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommunicationService } from '../../services/communication/communication.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  file: File | undefined;
  data: any;
  templateForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Type: new FormControl('', Validators.required),
    From: new FormControl('', Validators.required),
    Subject: new FormControl('', Validators.required),
    File : new FormControl('', Validators.required),
    Attachments: new FormControl(''),
  })

  constructor(private communicationService: CommunicationService ) { }

  ngOnInit(): void {
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  OnSaveTemplate() {
    debugger;
    if(this.file)
    this.communicationService.saveTemplate(this.templateForm.value, this.file).subscribe(
      (Response)=>{
        return Response;
      },
      (error)=>{
        return error;
      }
    )
  }
  Cancel(){
  }
}
