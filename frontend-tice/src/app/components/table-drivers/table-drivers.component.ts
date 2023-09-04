import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConductorService } from '../../services/conductor.service';

import swal from 'sweetalert';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-drivers',
  templateUrl: './table-drivers.component.html',
  styleUrls: ['./table-drivers.component.css']
})
export class TableDriversComponent implements OnInit {
  @Input() id: number;
  @Input() module:string;

  displayedColumns: string[] = [
    '#', 
    'codigo',
    'nombres', 
    'ci', 
    'sindicato', 
    'tipo', 
    'placa', 
    'fecha_registro', 
    'acciones'
  ];
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
      this.loadDrivers(this.id);
    }
    if(!!this.module && this.module == 'general'){
      this.loadDriversGral()
    }
    //this.loadConductores();
  }

  //methods

  loadDrivers(id:number){
    this._conductor.getDriversByIdUnion(id).subscribe((res:any)=>{
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
    //alert("eliminar"+value);
    swal({
      title: "Dirección Nacional de Transito",
      text:"¿Esta seguro que desea eliminar el registro? Se eliminará el conductor, el vehiculo y los antecedentes",
      icon: "info",
      buttons: ['NO', 'SI'],
      dangerMode: true,
    }).then((respuesta:boolean)=>{
      if(respuesta){
        //TODO eliminar lista de antecedentes dado el id de conductor
        this._conductor.deleteConductor(idCond).subscribe(()=>{
          swal('Dirección Nacional de Tránsito', 'Se eliminó al conductor de manera correcta', 'success').then(()=>{
            this.loadDriversGral();
          })
        })
      }
      //console.log('no eliminar solo cerrar modal');
    })

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
