import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import swal from 'sweetalert';
// import * as moment from 'moment';

@Component({
  selector: 'app-table-vehicles',
  templateUrl: './table-vehicles.component.html',
  styleUrls: ['./table-vehicles.component.css']
})
export class TableVehiclesComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @Output() dataEmitter = new EventEmitter<any>();
  
  vehicles:any[]=[];
  displayedColumns: string[] = ['#', 'codigo', 'imagen', 'placa', 'marca', 'modelo', 'conductor', 'propietario', 'acciones'];
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _vehicle:VehiculoService,
    //@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    //public dialogRef: MatDialogRef<TableVehiclesComponent>,
  ) { 
    //console.log(data);
  }

  ngOnInit(): void {
    this.loadVehicles()
  }

  loadVehicles(){
      this._vehicle.getVehiculos().subscribe((res:any)=>{
        this.vehicles = res;
        this.dataSource = new MatTableDataSource(this.vehicles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  agregar(){
    
  }

  update(item:any){

  }
  
  delete(id:any){

  }

  selectVehicle(item:any){
    this.dataEmitter.emit(item);
    //this.dialogRef.close();
    //console.log('el vehiculo seleccionado es:'+id)
  }

  // closeDialog(){
  //   this.dialogRef.close();
  // }
}
