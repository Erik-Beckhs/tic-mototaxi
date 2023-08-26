import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {
  imageLoad:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(e){

  }
  updateImage(){

  }
}
