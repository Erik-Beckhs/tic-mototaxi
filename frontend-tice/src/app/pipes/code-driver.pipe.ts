import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'code_driver'
})
export class CodeDriverPipe implements PipeTransform {

  transform(value: number): any {
    if(!!value){
      const code = ('00000'+value).slice(-6)
      return `CDTSC-${code}`
    }
    return value;
  }

}
