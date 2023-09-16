import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConductorService } from 'src/app/services/conductor.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';
//import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private _driver:ConductorService
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
  confirm_delete(item:any){
    Swal.fire({
      title: "Información",
      text: `¿Esta seguro que desea eliminar el vehículo?`,
      icon: "warning",
      showCancelButton: true, //
      confirmButtonColor: "#3085d6", // 
      cancelButtonColor: "#d33", // 
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(item)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }
  
  delete(item:any){
    if(!!item.id_conductor){
      Swal.fire('Atención', 'No se puede eliminar el vehiculo debido a que pertenece a un conductor registrado en el sistema', 'error');
      return;
    }
    else{
      this._vehicle.delete(item.id).subscribe(()=>{
        Swal.fire('Información', 'Se eliminó el vehiculo de manera exitosa', 'success');
        this.loadVehicles();
      })
    }
  }

  selectVehicle(item:any){
    this.dataEmitter.emit(item);
    //this.dialogRef.close();
    //console.log('el vehiculo seleccionado es:'+id)
  }
}
