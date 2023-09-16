import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AsociacionService } from '../../services/asociacion.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

//reportes
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-sindicatos-list',
  templateUrl: './sindicatos-list.component.html',
  styleUrls: ['./sindicatos-list.component.css']
})
export class SindicatosListComponent implements AfterViewInit {
  displayedColumns: string[] = ['#', 'nombre', 'representante', 'ciudad', 'direccion', 'fcreacion', 'personeria', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sindicatos:any;

  constructor(
    private _asociaciones:AsociacionService,
    private router:Router
    ) { 
    this.loadAsociaciones();
  }

    // Assign the data to the data source for the table to render
    

  ngAfterViewInit(): void {
    
  }

  loadAsociaciones(){
    this._asociaciones.getAsociaciones().subscribe((res)=>{
      this.sindicatos = res;
      console.log(this.sindicatos);

      this.dataSource = new MatTableDataSource(this.sindicatos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
  });//devolver sindicatos
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id:number){
    Swal.fire({
      title: "Advertencia",
      text:"Se eliminará el sindicato y los conductores registrados en la asociación. ¿Desea eliminarlo de todas formas?",
      icon: "warning",
      showCancelButton: true, //
      confirmButtonColor: "#3085d6", // 
      cancelButtonColor: "#d33", // 
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        this._asociaciones.deleteAsociacion(id).subscribe(()=>{
          this.loadAsociaciones();
          Swal.fire('Información', `Se eliminó el registro de manera exitosa`, 'success');
          return;
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  modificar(element:any){
    this.router.navigate(['/dashboard/asociacion', element]);
  }

  downloadPDF(){
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`conductores.pdf`);
    });
  }

}
