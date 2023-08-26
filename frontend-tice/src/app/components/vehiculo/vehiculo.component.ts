import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  imageLoad:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(e){

  }
  updateImage(){

  }
}
