import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AntecedentesService } from 'src/app/services/antecedentes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AntecedenteDialogComponent } from '../antecedente-dialog/antecedente-dialog.component';

import Swal from 'sweetalert2';
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
  displayedColumns: string[] = ['#', 'fecha', 'caso', 'disposicion', 'naturaleza', 'creado_por', 'acciones'];
  
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
    Swal.fire({
      title: "Información",
      text: `¿Esta seguro que desea eliminar el antecedente?`,
      icon: "warning",
      showCancelButton: true, //
      confirmButtonColor: "#3085d6", // 
      cancelButtonColor: "#d33", // 
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        this._antecedente.delete(id).subscribe(()=>{
          this.loadAntecedentes();
          Swal.fire('Información', 'Se eliminó el registro de manera exitosa', 'success');
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
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
