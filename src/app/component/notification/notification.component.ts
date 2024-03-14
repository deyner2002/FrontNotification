import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Template, Channel, Notification } from '../../services/communication/communication.model';
import { CommunicationService } from '../../services/communication/communication.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  templates: Template[] = [];
  enableFileExcel = false;
  enableUrl = false;
  disableActivation = true;
  disableRecurrence = true;
  file: File | undefined;
  data: any;

  notificationForm = new FormGroup({
    isProgrammed: new FormControl('false', Validators.required),
    templateId: new FormControl('', Validators.required),
    contactType: new FormControl(1, Validators.required),
    getObject: new FormControl(false, Validators.required),
    getObjectUrl: new FormControl('', Validators.required),
    objectTemplate: new FormControl('', Validators.required),
  })

  programmingInfoForm = new FormGroup({
    startDate: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
    endDate: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
    activationTime: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
    active: new FormControl(false, Validators.required),
    isRecurring: new FormControl(false, Validators.required),
    recurrence: new FormControl(0),
  })

  contactInfoForm = new FormGroup({
    name: new FormControl(),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),

  })

  constructor(private communicationService: CommunicationService) { }

  saveNotification() {
    if (true) {
      const notification = {
        isProgrammed: this.notificationForm.value.isProgrammed == "false" ? false : true ,
        programmingInfo: {
          startDate: this.programmingInfoForm.value.startDate,
          endDate: this.programmingInfoForm.value.endDate,
          active: this.programmingInfoForm.value.active,
          activationTime: this.programmingInfoForm.value.activationTime,
          isRecurring: this.programmingInfoForm.value.isRecurring,
          recurrence: this.programmingInfoForm.value.recurrence
        },
        contactInfo: {
          type: this.notificationForm.value.contactType,
          contactExcelBase64: "",
          contacts: [{
            name: this.contactInfoForm.value.name,
            lastName: this.contactInfoForm.value.name,
            phone: this.contactInfoForm.value.phone,
            mail: this.contactInfoForm.value.email
          }]
        },
        templatesIds: [this.notificationForm.value.templateId],
        getObject: this.notificationForm.value.getObject,
        getObjectUrl: this.notificationForm.value.getObjectUrl,
        objectTemplate: this.notificationForm.value.objectTemplate
      };
      this.communicationService.saveNotification(notification).subscribe(
        (Response) => {
          alert("Notification saved successfully!");
          this.notificationForm.reset();
          this.programmingInfoForm.reset();
          this.contactInfoForm.reset();
          this.file = undefined;
          return Response;
        },
        (error) => {
          return error;
        }
      )
    }
  }

  ngOnInit(): void {
    this.enableFileExcel = false;
    this.programmingInfoForm.disable();
    this.getTemplates();
  }

  getTemplates() {
    this.communicationService.getTemplates().subscribe(templates => {
      this.templates = templates;
    });
  }

  enableProgrammingInfo(event: any) {
    if (event.target.value === 'true') {
      this.programmingInfoForm.enable();
    } else {
      this.programmingInfoForm.disable();
    }
  }

  enableContactInfo(event: any) {
    if (event.target.value === '1') {
      this.contactInfoForm.enable();
      this.enableFileExcel = false;
    } else {
      this.contactInfoForm.disable();
      this.enableFileExcel = true;
    }
  }

  enableGetObject(event: any) {
    if (event.target.value === '1') {
      this.contactInfoForm.enable();
      this.enableFileExcel = false;
    } else {
      this.contactInfoForm.disable();
      this.enableFileExcel = true;
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  enableUrlObject(event: any) {
    debugger;
    this.enableUrl = event.target.checked;
  }

  enableActivationDate(event: any) {
    debugger;
    this.disableActivation = event.target.checked;
  }

  enableRecurrenceType(event: any) {
    debugger;
    this.disableRecurrence = event.target.checked;
  }
}
