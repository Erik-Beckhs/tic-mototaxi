import { Component, EventEmitter, Inject, OnInit, Optional, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AntecedentesService } from 'src/app/services/antecedentes.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-antecedente-dialog',
  templateUrl: './antecedente-dialog.component.html',
  styleUrls: ['./antecedente-dialog.component.css']
})
export class AntecedenteDialogComponent implements OnInit {
  @Output() create = new EventEmitter<any>();

  parentId:number;
  id:number;

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
    private _auth:AuthService
    //private router:Router
  ) { 
    this.parentId=this.data.parentId;
    if(!!this.data.id){
      this.id = this.data.id;
    }
  }

  ngOnInit(): void {
    if(this.id){
      const {
        disposicion,
        fecha,
        naturaleza
      } = this.data;

      this.antecedente.disposicion = disposicion;
      this.antecedente.fecha = fecha;
      this.antecedente.naturaleza = naturaleza;

    }
    else{
      //console.log(this.parentId);
      this.antecedente.fecha = moment(new Date()).format('YYYY-MM-DD');
    }
    //this.generarCaso();
  }

  register(item:any){
    item.id_conductor = this.parentId;
    item.creado_por = this._auth.user_data.id;
    this._antecedente.createAntecedente(item).subscribe(()=>{
      this.create.emit(1);
      this.dialogRef.close();
      Swal.fire('Información', 'Se registró su antecedente de manera exitosa', 'success');
    })
  }

  onSubmit(item:any){
    if(this.id){
      this.update(this.id, item);
    }
    else{
      this.generaCaso(item);
    }
  }

  update(id:number, item:any){
    this._antecedente.update(id, item).subscribe(()=>{
      this.create.emit(1);
      this.dialogRef.close();
      Swal.fire('Información', 'Se modificó el registro', 'success');
    })
  }

  generaCaso(item:any){
    this._antecedente.getLastId().subscribe((res:any)=>{
      const lastId = parseInt(res.id)+1;
      const code = ('00000'+lastId).slice(-6);
      const new_code = `ADTSC-${code}/${new Date().getFullYear()}`
      item.caso = new_code;
      this.register(item);
    })
    //obtener el ultimo id, sumarle 1
    //el caso tendra el siguiente formato ADT-000001/2023
    //se almacena en antecedente.caso
  }
}
