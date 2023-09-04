import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AsociacionService } from 'src/app/services/asociacion.service';

@Component({
  selector: 'app-asociacion',
  templateUrl: './asociacion.component.html',
  styleUrls: ['./asociacion.component.css']
})
export class AsociacionComponent implements OnInit {
  id:any=0;
  asociacion:any={}

  constructor(
    private activatedRoute:ActivatedRoute,
    private _asociacion:AsociacionService
    ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0){
      this.loadAsociacion();
    }
  }

  asignaId(value: number) {
    this.id = value;
    this.loadAsociacion();
  }

  //methods
  loadAsociacion(){
    this._asociacion.getAsociacionById(this.id).subscribe((res)=>{
      this.asociacion = res;
    })
  }

}
