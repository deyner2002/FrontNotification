import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Template, Channel } from '../../services/communication/communication.model';
import { CommunicationService } from '../../services/communication/communication.service';
import { Router } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import {AccountService} from '../../services/account/account.service';
import { MatDialog } from '@angular/material/dialog';
import { RendermodalComponent } from '../rendermodal/rendermodal.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  templateEdit: Template = {} as Template;
  templates: Template[] = [];
  disabledProperties = true;
  showTable = true;
  showCreate = false;
  showEdit = false;
  file: File | undefined;
  data: any;
  totalItems = 0;
  page = 1;
  itemsPerPage = 5;
  templateForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Type: new FormControl('', Validators.required),
    From: new FormControl('', Validators.required),
    Subject: new FormControl('', Validators.required),
    Attachments: new FormControl(''),
    NumberId: new FormControl(),
  })

  constructor(private communicationService: CommunicationService,
    private router: Router,
    /*, public dialog: MatDialog*/
    private config: NgbPaginationConfig,
    private accountService: AccountService
  ) {
    config.pageSize = this.itemsPerPage;
  }

  ngOnInit(): void {
    this.showTable = true;
    this.showEdit = false;
    this.showCreate = false;
    this.validarPermisos();
    this.getTemplates(this.page);
  }

  validarPermisos(): void {
    const userAccount = this.accountService.getUserAccountFromStorage();
    console.log(userAccount);
    console.log(userAccount.accountType);
  }

  getTemplates(page: number) {
    this.communicationService.getTemplates().subscribe(templates => {
      this.templates = templates;
      this.totalItems = templates.length;
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.templates.length);
      this.templates = this.templates.slice(startIndex, endIndex);
      while (this.templates.length < 5) {
        this.templates.push({} as Template);
      }
    });
  }

  saveTemplate() {
    if (this.file) {
      this.communicationService.saveTemplate(this.templateForm.value, this.file).subscribe(
        (Response) => {
          alert("Template saved successfully!");
          this.templateForm.reset();
          this.file = undefined;
          return Response;
        },
        (error) => {
          return error;
        }
      )
      setTimeout(() => {
        this.getTemplates(this.page);
        this.showTableTemplates();
      }, 2000);
    }
  }

  deleteTemplate(numberId: number) {
    const isConfirmed = confirm("Are you sure you want to delete this template?");
    if (isConfirmed) {
      this.communicationService.deleteTemplate(numberId).subscribe(
        response => {
        },
        error => {
          console.error("Error when deleting the template:", error);
        }
      );
      const index = this.templates.findIndex(template => template.numberId === numberId);
      if (index !== -1) {
        this.templates.splice(index, 1);
      }
    }
  }

  editTemplate() {
    if (this.file) {
      this.communicationService.editTemplate(this.templateForm.value, this.file).subscribe(
        (Response) => {
          this.templateForm.reset();
          this.file = undefined;
          return Response;
        },
        (error) => {
          return error;
        }
      )
      setTimeout(() => {
        this.getTemplates(this.page);
        this.showTableTemplates();
      }, 2000);
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  getChannelName(channel: Channel): string {
    return Channel[channel];
  }

  showTableTemplates() {
    this.showTable = true;
    this.showEdit = false;
    this.showCreate = false;
  }

  showFormCreate() {
    this.showTable = false;
    this.showEdit = false;
    this.showCreate = true;
    this.templateForm.reset();
  }

  showFormEdit(id: number) {
    this.showTable = false;
    this.showEdit = true;
    this.showCreate = false;
    this.communicationService.getTemplateById(id).subscribe(template => {
      this.templateEdit = template;
      this.templateForm.setValue({
        'Name': this.templateEdit.name,
        'Subject': this.templateEdit.subject,
        'Type': this.templateEdit.channel.toString(),
        'From': this.templateEdit.sender,
        'Attachments': this.templateEdit.attachments,
        'NumberId': this.templateEdit.numberId
      });
      const blob = new Blob([this.templateEdit.body], { type: 'text/html' });
      this.file = new File([blob], `${this.templateEdit.name}.html`, { type: 'text/html' });
    });
  }

  generateFileBody() {
    const blob = new Blob([this.templateEdit.body], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.templateEdit.name}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  openPopup() {
    if (this.templateEdit.body !== null) {
      const ventanaEmergente = window.open('', '_blank');
      if (ventanaEmergente) {
        ventanaEmergente.document.write(this.templateEdit.body);
      } else {
        console.error('The popup could not be opened.');
      }
    } else {
      console.error('The HTML code is null.');
    }
  }

}
