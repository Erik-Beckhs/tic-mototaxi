import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-owners',
  templateUrl: './table-owners.component.html',
  styleUrls: ['./table-owners.component.css']
})
export class TableOwnersComponent implements OnInit {
  displayedColumns: string[] = [
    '#', 
    'nombre', 
    'fecha_registro', 
    'ci', 
    'fecha_nacimiento',
    'genero',
    'cant_vehiculos',
    'acciones',
  ];
  dataSource: MatTableDataSource<any>;
  owners:any=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.owners);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //methods
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id:number){

  }

  delete(id:number){

  }
}
