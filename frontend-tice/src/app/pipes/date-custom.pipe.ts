import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({
  name: 'date_custom'
})
export class DateCustomPipe implements PipeTransform {

  transform(value: any): string {
    let res='';
    if(!!value){
      res = moment(value).format('DD/MM/YYYY');
    }
    return res;
  }

}
