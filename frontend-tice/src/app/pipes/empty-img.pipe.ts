import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyImg'
})
export class EmptyImgPipe implements PipeTransform {

  transform(value: any): string {
    let res=''
    if(value === '' || value === null){
      res = 'https://media.prodalam.cl/default/default.png';
    }
    return res;
  }
}
