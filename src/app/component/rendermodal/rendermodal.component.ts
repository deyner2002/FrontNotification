import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rendermodal',
  templateUrl: './rendermodal.component.html',
  styleUrls: ['./rendermodal.component.scss']
})
export class RendermodalComponent  {
  html: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.html = data.html;
  }
}
