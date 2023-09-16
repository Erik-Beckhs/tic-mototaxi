import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConductorService } from '../../services/conductor.service';

import Swal from 'sweetalert2';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-drivers',
  templateUrl: './table-drivers.component.html',
  styleUrls: ['./table-drivers.component.css']
})
export class TableDriversComponent implements OnInit {
  @Input() id: number;

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  conductores:any=[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router:Router,
    public dialog: MatDialog,
    public _conductor:ConductorService,
  ) { 

  }

  ngOnInit(): void {
    if(this.id){
      //devuelve a los conductores del sindicato
      this.loadDrivers();
      this.displayedColumns= [
        '#', 
        'codigo',
        'nombres', 
        'ci', 
        'tipo', 
        'placa', 
        'fecha_registro', 
        'acciones'
      ];
    }
    else{
      this.loadDriversGral();
      this.displayedColumns= [
        '#', 
        'codigo',
        'nombres', 
        'ci', 
        'tipo', 
        'placa',
        'sindicato', 
        'fecha_registro', 
        'acciones'
      ];
    }
    // if(!!this.module && this.module == 'general'){
    //   this.loadDriversGral()
    // }
    //this.loadConductores();
  }

  //methods

  loadDrivers(){
    this._conductor.getDriversByIdUnion(this.id).subscribe((res:any)=>{
      this.conductores = res;

      this.conductores.forEach((element:any) => {
        if(!!element.vehiculos){
          element.vehiculos = element.vehiculos[0]
        }
      })

      this.dataSource = new MatTableDataSource(this.conductores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadDriversGral(){
    //console.log('modo tabla')
    this._conductor.getConductores().subscribe((res:any)=>{
      this.conductores = res;
      this.conductores.forEach((element:any) => {
        if(!!element.vehiculos){
          element.vehiculos = element.vehiculos[0];
        }
      })

      this.dataSource = new MatTableDataSource(this.conductores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //console.log(res);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(value:any){
    this.router.navigate(['/dashboard/driver', value]);
    
    // const dialogRef = this.dialog.open(EditConductorComponent, {
    //   width: '800px',
    //   data: value
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  antecedente(value:any){
    this.router.navigate(['/dashboard/antecedente', value]);
  }
  
  delete(idCond:any){
    Swal.fire({
      title: "Información",
      text: `¿Esta seguro que desea eliminar el registro? Se eliminará toda la información relacionada con el conductor`,
      icon: "warning",
      showCancelButton: true, //
      confirmButtonColor: "#3085d6", // 
      cancelButtonColor: "#d33", // 
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        this._conductor.deleteConductor(idCond).subscribe(()=>{
          Swal.fire('Información', 'Se eliminó al conductor de manera correcta', 'success').then(()=>{
            this.loadDriversGral();
          })
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  remove(id:number){
    Swal.fire({
      title: "Información",
      text: `Esta seguro de retirar al conductor de la asociación`,
      icon: "warning",
      showCancelButton: true, //
      confirmButtonColor: "#3085d6", // 
      cancelButtonColor: "#d33", // 
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this._conductor.update(id, {id_asociacion:null}).subscribe((res:any)=>{
          Swal.fire('Información', 'Se retiró al conductor de la asociación', 'success');
          this.loadDrivers();
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  // loadConductores(){
  //   this._conductor.getConductoresInfoGral().subscribe((res)=>{
  //     this.conductores = res;
  //     //console.log(this.conductores);
  //     this.dataSource = new MatTableDataSource(this.conductores);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }

}
