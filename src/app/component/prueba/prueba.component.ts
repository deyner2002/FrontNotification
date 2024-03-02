import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  mostrar = false;
  textoCheckbox = "Texto checkbox sin checkar";
  name = "nada";
  universidad = "UPC";
  private edad = 12;
  bindingText = false;
  bindingTextN = false;
  constructor() { }

  GuardarEmpresa(value: string){

  }

  ngOnInit(): void {
  }


  getEdad(){
    return this.edad;
  }

  getAlert(event: Event){
if((<HTMLInputElement>event.target).value == "si"){
  this.textoCheckbox = "checkeadoo";
}else{
  this.textoCheckbox = "no checkeadoo";
}
    alert("Hola soy un alerta");
  }
}
