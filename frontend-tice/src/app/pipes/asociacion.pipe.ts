import { Pipe, PipeTransform } from '@angular/core';
import { ListsService } from '../services/lists.service';
//import { UeducativaService } from '../services/ueducativa.service';
import { AsociacionService } from '../services/asociacion.service';

@Pipe({
  name: 'asociacion'
})
export class AsociacionPipe implements PipeTransform {
  asociaciones:any[]=[];

  constructor(private _asociacion:AsociacionService){
    this._asociacion.getAsociaciones().subscribe((res:any)=>{
      this.asociaciones = res;
    })
  }

  transform(value: any): string {
    let asoc='';
    this.asociaciones.forEach(asociacion=>{
      if(asociacion.id == value){
        asoc = asociacion.nombre;
      }
    });
    return asoc;
  }

}
