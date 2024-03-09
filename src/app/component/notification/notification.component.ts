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

  notification: Notification = {
    isProgrammed: true,
    programmingInfo: {
      startDate: new Date(),
      endDate: new Date(),
      active: true,
      activationTime: new Date(),
      isRecurring: true,
      recurrence: 0
    },
    contactInfo: {
      type: 0,
      contactExcelBase64: "",
      contacts: [{
        name: "",
        lastName: "",
        phone: "",
        mail: ""
      }]
    },
    templatesIds: [0],
    getObject: true,
    getObjectUrl: "",
    objectTemplate: ""
  };

  notificationForm = new FormGroup({
    isProgrammed: new FormControl('false', Validators.required),
    templateId: new FormControl('', Validators.required),
    contactType: new FormControl('1', Validators.required),
    getObject: new FormControl('', Validators.required),
    getObjectUrl: new FormControl('', Validators.required),
    objectTemplate: new FormControl('', Validators.required),
  })
  programmingInfoForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    activationTime: new FormControl(),
    active: new FormControl('', Validators.required),
    isRecurring: new FormControl('', Validators.required),
    recurrence: new FormControl(),
  })

  contactInfoForm = new FormGroup({
    name: new FormControl(),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),

  })

  constructor(private communicationService: CommunicationService) { }

  saveNotification() {
    if (true) {
      this.communicationService.saveNotification(this.notification).subscribe(
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
