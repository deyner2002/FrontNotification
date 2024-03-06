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