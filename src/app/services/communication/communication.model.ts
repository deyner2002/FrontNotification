export class Notification{
    isProgrammed : boolean = false;
    programmingInfo: ProgrammingInfo = new ProgrammingInfo();
    contactInfo: ContactInfo = new ContactInfo;
    templatesIds : number[] = [];
    getObject: boolean = false
    getObjectUrl: string = '';
    objectTemplate: string = '';
}

export class ProgrammingInfo{
    startDate : Date = new Date();
    endDate : Date = new Date();
    active: boolean = false
    activationTime: Date = new Date();
    isRecurring: boolean = false;
    recurrence: number = 0;
}

export class ContactInfo{
    type : number = 0;
    contactExcelBase64 : string = '';
    contacts : Contact[] = [];
}

export class Contact{
    name: string = '';
    lastName: string = '';
    phone: string = '';
    mail: string = '';
}

export interface Template{
    numberId : number,
    name: string,
    channel: Channel,
    sender: string,
    subject: string,
    file : File,
    attachments: string,
    body: string
}
export enum Channel {
    Email,
    Sms,
    WhatsApp
  }