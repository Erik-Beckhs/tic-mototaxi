import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PropietarioService } from '../../services/propietario.service'

@Component({
  selector: 'app-table-owners',
  templateUrl: './table-owners.component.html',
  styleUrls: ['./table-owners.component.css']
})
export class TableOwnersComponent implements OnInit {
  @Output() dataEmitter = new EventEmitter<any>();
  
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
  
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _owner:PropietarioService
  ) { }

  ngOnInit(): void {
    // console.log(this.data);

    this.loadOwners()
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

  loadOwners(){
    this._owner.getOwners().subscribe((res:any)=>{
      this.owners = res;
      //console.log(res);
      this.dataSource = new MatTableDataSource(this.owners);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  selectItem(item:any){
    this.dataEmitter.emit(item);
  }
}
