import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { AntecedentesService } from 'src/app/services/antecedentes.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { AntecedenteDialogComponent } from '../../components/antecedente-dialog/antecedente-dialog.component';

import Swal from 'sweetalert2';
import * as printJS from 'print-js';

@Component({
  selector: 'app-antecedente',
  templateUrl: './antecedente.component.html',
  styleUrls: ['./antecedente.component.css']
})
export class AntecedenteComponent implements OnInit {
  id:number;
  conductor:any={
    fotografia:''
  }
  vehiculo:any;

  //print:any=true;

  antecedentes:any[]=[];

  displayedColumns: string[] = ['#', 'fecha', 'caso', 'disposicion', 'naturaleza', 'creado_por', 'acciones'];
  //dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private _conductor:ConductorService,
    private _vehiculo:VehiculoService,
    private _antecedente:AntecedentesService,
    public dialog: MatDialog
    ) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadConductor();
    this.loadVehiculo();
    this.loadAntecedentes();
   }

  ngOnInit(): void {
    this._antecedente.notificacion.subscribe(
      resp=>this.loadAntecedentes()
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  loadAntecedentes(){
    this._antecedente.getAntecedentesById(this.id).subscribe((res:any)=>{
      this.antecedentes = res;
      // this.dataSource = new MatTableDataSource(this.antecedentes);

      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    })
  }

  loadConductor(){
    if(this.id !== 0){
      this._conductor.getConductorById(this.id).subscribe(res=>{
        this.conductor = res;
      })
    }
  }

  loadVehiculo(){
    if(this.id !== 0){
      this._vehiculo.getVehiculoByIdConductor(this.id).subscribe(res=>{
        this.vehiculo = res;
      })
    }
  }

  agregar(){
    const dialogRef = this.dialog.open(AntecedenteDialogComponent, {
      width: '600px',
      data: this.id
    });
  }

  eliminar(id:any){
    Swal.fire({
      title: "Información",
      text:"¿Esta seguro que desea eliminar el antecedente?",
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
          Swal.fire('Información', 'Se eliminó el antecedente de manera exitosa', 'success');
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  imprimir(){
    //this.print=false;
    printJS('registro', 'html');
  }

}
