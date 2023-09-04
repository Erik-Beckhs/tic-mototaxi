import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AntecedentesService } from 'src/app/services/antecedentes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AntecedenteDialogComponent } from '../antecedente-dialog/antecedente-dialog.component';

import swal from 'sweetalert';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-antecedentes',
  templateUrl: './table-antecedentes.component.html',
  styleUrls: ['./table-antecedentes.component.css']
})
export class TableAntecedentesComponent implements OnInit {
  @Input() id:number;
  
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  antecedentes:any[]=[];
  displayedColumns: string[] = ['#', 'fecha', 'caso', 'disposicion', 'naturaleza', 'acciones'];
  
  constructor(
    private _antecedente:AntecedentesService,
    public dialog: MatDialog
  ) { 
    
  }

  ngOnInit(): void {
    this.loadAntecedentes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id:any){
    //console.log(id);
    swal({
      title: "Eliminar antecedente",
      text:"¿Esta seguro que desea eliminar el antecedente?",
      icon: "info",
      buttons: ['NO', 'SI'],
      dangerMode: true,
    }).then((respuesta:boolean)=>{
      if(respuesta){
        this._antecedente.delete(id).subscribe(()=>{
          this.loadAntecedentes();
          swal('Información', 'Se eliminó el registro de manera exitosa', 'success');
        })
      }
    })
  }

  update(item:any){
    const dialogRef = this.dialog.open(AntecedenteDialogComponent, {
      width: '600px',
      data: {
        parentId:this.id,
        ...item
      }
    });
    dialogRef.componentInstance.create.subscribe((data) => {
      if(data == 1) this.loadAntecedentes();
    });
  }

  agregar(){
    const dialogRef = this.dialog.open(AntecedenteDialogComponent, {
      width: '600px',
      data: {
        parentId:this.id
      }
    });
    dialogRef.componentInstance.create.subscribe((data) => {
      if(data == 1) this.loadAntecedentes();
    });
  }

  loadAntecedentes(){
    this._antecedente.getAntecedentesById(this.id).subscribe((res:any)=>{
      this.antecedentes = res;
      this.dataSource = new MatTableDataSource(this.antecedentes);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
