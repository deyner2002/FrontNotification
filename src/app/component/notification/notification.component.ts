import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Template, Channel, Notification } from '../../services/communication/communication.model';
import { CommunicationService } from '../../services/communication/communication.service';
import {AccountService} from '../../services/account/account.service';

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
  isFree = false;
  isMedium = false;
  isPremium = false;
  isAdmin = false;
  file: File | undefined;
  data: any;

  notificationForm = new FormGroup({
    isProgrammed: new FormControl('false', Validators.required),
    templateId: new FormControl('', Validators.required),
    contactType: new FormControl(1, Validators.required),
  })

  programmingInfoForm = new FormGroup({
    startDate: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
    endDate: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
    activationTime: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
    active: new FormControl(false, Validators.required),
  })

  contactInfoForm = new FormGroup({
    name: new FormControl(),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  })

  externalIntegrationForm = new FormGroup({
    getObject: new FormControl(false, Validators.required),
    getObjectUrl: new FormControl('', Validators.required),
    objectTemplate: new FormControl('', Validators.required),
  })

  recurrenceForm = new FormGroup({
    isRecurring: new FormControl(false, Validators.required),
    recurrence: new FormControl(0),
  })

  constructor(private communicationService: CommunicationService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.enableFileExcel = false;
    this.validarPermisos();
    this.programmingInfoForm.disable();
    this.recurrenceForm.disable();
    this.getTemplates();
  }

  validarPermisos(): void {
    const userAccount = this.accountService.getUserAccountFromStorage();
    if(userAccount.accountType === "Free"){
      this.externalIntegrationForm.disable();
      this.recurrenceForm.disable();
      this.isFree = true;
    }
    if(userAccount.accountType === "Medium"){
      this.externalIntegrationForm.disable();
      this.recurrenceForm.disable();
      this.isMedium = true;
    }
      
    if(userAccount.accountType === "Premium" || userAccount.accountType === "Admin"){
      this.externalIntegrationForm.enable();
      this.recurrenceForm.enable();
      this.isPremium = true;
    }
  }

  saveNotification() {
    if (this.file && parseInt(this.notificationForm.value.contactType +"") === 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const notification = {
          isProgrammed: this.notificationForm.value.isProgrammed == "false" ? false : true ,
          programmingInfo: {
            startDate: this.programmingInfoForm.value.startDate,
            endDate: this.programmingInfoForm.value.endDate,
            active: this.programmingInfoForm.value.active,
            activationTime: this.programmingInfoForm.value.activationTime,
            isRecurring: this.recurrenceForm.value.isRecurring,
            recurrence: this.recurrenceForm.value.recurrence
          },
          contactInfo: {
            type: parseInt(this.notificationForm.value.contactType +""),
            contactExcelBase64: base64String.split(';base64,')[1],
            contacts: [{
              name: this.contactInfoForm.value.name,
              lastName: this.contactInfoForm.value.name,
              phone: this.contactInfoForm.value.phone,
              mail: this.contactInfoForm.value.email
            }]
          },
          templatesIds: [this.notificationForm.value.templateId],
          getObject: this.externalIntegrationForm.value.getObject,
          getObjectUrl: this.externalIntegrationForm.value.getObjectUrl,
          objectTemplate: this.externalIntegrationForm.value.objectTemplate
        };
    
        this.communicationService.saveNotification(notification).subscribe(
          (Response) => {
            return Response;
          },
          (error) => {
            if (error.error.text === "The notification was saved"){
              alert("Notification saved successfully!");
              this.notificationForm.reset();
              this.programmingInfoForm.reset();
              this.contactInfoForm.reset();
              this.recurrenceForm.reset();
              this.file = undefined;
            }else{
              alert("Error saving notification");
            }
            return error;
          }
        )
      };
      reader.readAsDataURL(this.file);
    } else {
      const notification = {
        isProgrammed: this.notificationForm.value.isProgrammed == "false" ? false : true ,
        programmingInfo: {
          startDate: this.programmingInfoForm.value.startDate,
          endDate: this.programmingInfoForm.value.endDate,
          active: this.programmingInfoForm.value.active,
          activationTime: this.programmingInfoForm.value.activationTime,
          isRecurring: this.recurrenceForm.value.isRecurring,
          recurrence: this.recurrenceForm.value.recurrence
        },
        contactInfo: {
          type: parseInt(this.notificationForm.value.contactType +""),
          contactExcelBase64: "",
          contacts: [{
            name: this.contactInfoForm.value.name,
            lastName: this.contactInfoForm.value.name,
            phone: this.contactInfoForm.value.phone,
            mail: this.contactInfoForm.value.email
          }]
        },
        templatesIds: [this.notificationForm.value.templateId],
        getObject: this.externalIntegrationForm.value.getObject,
        getObjectUrl: this.externalIntegrationForm.value.getObjectUrl,
        objectTemplate: this.externalIntegrationForm.value.objectTemplate
      };
  
      this.communicationService.saveNotification(notification).subscribe(
        (Response) => {
          return Response;
        },
        (error) => {
          if (error.error.text === "The notification was saved"){
            alert("Notification saved successfully!");
            this.notificationForm.reset();
            this.programmingInfoForm.reset();
            this.contactInfoForm.reset();
            this.recurrenceForm.reset();
            this.file = undefined;
          }else{
            alert("Error saving notification");
          }
          return error;
        }
      )
    }
  }

  getTemplates() {
    this.communicationService.getTemplates().subscribe(templates => {
      this.templates = templates;
    });
  }

  enableProgrammingInfo(event: any) {
    this.validarPermisos();
    if (event.target.value === 'true') {
      this.programmingInfoForm.enable();
      this.recurrenceForm.enable();
    } else {
      this.programmingInfoForm.disable();
      this.recurrenceForm.disable();
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
    this.enableUrl = event.target.checked;
  }

  enableActivationDate(event: any) {
    this.disableActivation = event.target.checked;
  }

  enableRecurrenceType(event: any) {
    this.disableRecurrence = event.target.checked;
  }
}
