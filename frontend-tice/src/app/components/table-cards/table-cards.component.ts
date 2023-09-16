import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-cards',
  templateUrl: './table-cards.component.html',
  styleUrls: ['./table-cards.component.css']
})
export class TableCardsComponent implements OnInit {
  @Input() id:number;
  
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cards:any[]=[];
  vehicle:any;
  current_year:number = 0;
  displayedColumns: string[] = [
    '#', 
    'tipo', 
    'numero', 
    'fecha_inicio', 
    'fecha_finalizacion', 
    'observacion', 
    'creado_por'
  ];
  
  constructor(
    private _card:TarjetaService,
    private _vehicle:VehiculoService
  ) {
    this.current_year = new Date().getFullYear();
   }

  ngOnInit(): void {
    this.loadCards();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  vigencia_soat(inicio:any, fin:any){
    const fecha_actual = new Date();
    const f1 = new Date(inicio);
    const f2 = new Date(fin)

    if(fecha_actual >= f1 && fecha_actual <= f2){
      return true;
    }
    else{
      return false;
    }
  }

  generar(){
    //validar la informacion
    //obtener el vehiculo
    this._vehicle.getVehicleByDriverId(this.id).subscribe((res:any)=>{
      this.vehicle = res[0]
      if(!!this.vehicle) {
        if(this.vehicle.itv.substring(0,4) == this.current_year){
          if(this.vigencia_soat(this.vehicle.vigencia.fecha_inicio_soat, this.vehicle.fecha_fin_soat)){
            console.log('create');
          }
          else{
            Swal.fire("Información", "El SOAT del vehiculo se encuentra caducado", "error");
          }
        }
        else{
          Swal.fire("Información", "La ITV del vehiculo se encuentra caducada", "error");
        }
      }
      else{
        Swal.fire("Información", "Ocurrió un error al recuperar el vehículo", "error");
      }
    })

    //revisar vigencia de itv
    //revisar vigencia de soat
    //si todo va bien proceder a crear
    //si no cumple indicar con alert

    // const dialogRef = this.dialog.open(AntecedenteDialogComponent, {
    //   width: '600px',
    //   data: {
    //     parentId:this.id
    //   }
    // });
    // dialogRef.componentInstance.create.subscribe((data) => {
    //   if(data == 1) this.loadAntecedentes();
    // });
  }

  loadCards(){
    this._card.getCardsByIdDriver(this.id).subscribe((res:any)=>{
      this.cards = res;

      this.cards.forEach(res=>(res.id=(('00000'+res.id).slice(-6))))

      this.dataSource = new MatTableDataSource(this.cards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
