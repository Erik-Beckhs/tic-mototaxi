import { NgModule } from '@angular/core';
import { EmptyImgPipe } from './empty-img.pipe';
import { AsociacionPipe } from './asociacion.pipe';
import { DateCustomPipe } from './date-custom.pipe';

@NgModule({
  declarations: [
    EmptyImgPipe,
    DateCustomPipe,
    AsociacionPipe
  ],
  imports: [
    
  ],
  exports:[
    EmptyImgPipe,
    DateCustomPipe,
    AsociacionPipe
  ]
})
export class PipesModule { }
