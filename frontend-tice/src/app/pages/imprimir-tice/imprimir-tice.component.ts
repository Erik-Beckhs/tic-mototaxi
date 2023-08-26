import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as printJS from 'print-js';

@Component({
  selector: 'app-imprimir-tice',
  templateUrl: './imprimir-tice.component.html',
  styleUrls: ['./imprimir-tice.component.css']
})
export class ImprimirTICEComponent implements OnInit {
  elementType = 'url';
  value:any;
  hoy:any = new Date();
  inicio:any = this.hoy.toLocaleDateString();
  nextYear:any = this.hoy.setFullYear(this.hoy.getFullYear()+1);
  fin:any = new Date(this.nextYear).toLocaleDateString();
  gestion:number = new Date().getFullYear();

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
    ) { 
      this.value = `
            DIRECCIÓN DEPARTAMENTAL DE TRÁNSITO SANTA CRUZ
            Nombre: ${this.data.conductor.nombres} ${this.data.conductor.apellidos} 
            Tipo de Sangre: ${this.data.conductor.tipo_sangre}
            Licencia: ${this.data.conductor.licencia}
             Categoria: ${this.data.conductor.cat_licencia}
            Placa: ${this.data.vehiculo.placa}
            VALIDO DEL ${this.inicio} AL ${this.fin} 
              `
            ;
    }

  ngOnInit(): void {
    console.log(this.data.conductor);
    console.log(this.data.vehiculo);
  }

  imprimir(){
    printJS('tarjeta', 'html')
  }

  ajustar(){
    const b = document.querySelector('.aclass');
    b.children[0].classList.add('w-100');
  }
}
