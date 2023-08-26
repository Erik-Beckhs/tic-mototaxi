import { Component, Inject, OnInit, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AntecedentesService } from 'src/app/services/antecedentes.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-antecedente-dialog',
  templateUrl: './antecedente-dialog.component.html',
  styleUrls: ['./antecedente-dialog.component.css']
})
export class AntecedenteDialogComponent implements OnInit {

  id:any;

  antecedente:any={
    fecha:'',
    caso:'',
    disposicion:'',
    naturaleza:'', 
    id_conductor:''
  }

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _antecedente:AntecedentesService,
    public dialogRef:MatDialogRef<any>,
    private router:Router
  ) { 
    this.id=this.data
  }

  ngOnInit(): void {
    this.generarCaso();
  }

  registrar(object:NgForm){
    //console.log(data);
    this.antecedente = object;
    this.antecedente.id_conductor = this.id;
    this._antecedente.createAntecedente(this.antecedente).subscribe(res=>{
      swal('Registro exitoso', 'Se registró su antecedente de manera exitosa', 'success').then(res=>{
        //console.log('cerrar modal');
        this._antecedente.notificacion.emit(res)
        this.dialogRef.close();
        //TODO: actualizar tabla de antecedentes
        //this.router.navigate(['/dashboard/antecedente', this.id]);
      })
    })
  }

  generarCaso(){
    let n = Date.now();
    this.antecedente.caso = `${n}/${new Date().getUTCFullYear()}`;
  }
}
