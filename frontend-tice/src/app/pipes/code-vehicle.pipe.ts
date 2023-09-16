import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'code_vehicle'
})
export class CodeVehiclePipe implements PipeTransform {

  transform(value: number): any {
    if(!!value){
      const code = ('00000'+value).slice(-6)
      return `VDTSC-${code}`
    }
    return value;
  }
}
