import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConductorService } from '../../services/conductor.service';
import { VehiculoService } from '../../services/vehiculo.service';
import { Router } from '@angular/router';

const img = 'https://www.bellavista.cl/static/assets/images/without_image.jpg';
//import * as printJS from 'print-js';
import { ImprimirTICEComponent } from '../imprimir-tice/imprimir-tice.component';

@Component({
  selector: 'app-edit-conductor',
  templateUrl: './edit-conductor.component.html',
  styleUrls: ['./edit-conductor.component.css']
})
export class EditConductorComponent implements OnInit {
  conductor:any = {
    fotografia:''
  };

  vehiculo:any = {
    img:''
  };

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _conductor:ConductorService,
    private _vehiculo:VehiculoService,
    private router:Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>
    ) { 
    //this.loadConductor();
    
  }

  ngOnInit(): void {
    this.loadConductor();
    this.loadVehiculo();
  }

  loadConductor(){
    this._conductor.getConductorById(this.data).subscribe((res:any)=>{
      this.conductor = res;
      this.conductor.fecha_nac = new Date(this.conductor.fecha_nac).toDateString();
      //console.log(this.conductor.fotografia);
      //console.log(this.)
    })
  }

  loadVehiculo(){
    this._vehiculo.getVehiculoByIdConductor(this.data).subscribe((res)=>{
      this.vehiculo = res;
      if(!this.vehiculo.img){
        this.vehiculo.img = img;
      }
      //console.log(this.vehiculo);
    })
  }

  editarRenovar(){
    this.dialogRef.close();
    this.router.navigate(['/dashboard/inscribir', this.data]);
  }

  openPrint(){
    
    this.dialog.open(ImprimirTICEComponent, {
      width: '800px',
      data: {
        conductor:this.conductor,
        vehiculo:this.vehiculo
      }
    });

    this.dialogRef.close();
  }
}
