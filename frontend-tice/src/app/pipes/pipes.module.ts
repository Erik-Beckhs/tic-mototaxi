import { NgModule } from '@angular/core';
import { EmptyImgPipe } from './empty-img.pipe';
import { AsociacionPipe } from './asociacion.pipe';
import { DateCustomPipe } from './date-custom.pipe';
import { CodeVehiclePipe } from './code-vehicle.pipe';
import { CodeDriverPipe } from './code-driver.pipe';

@NgModule({
  declarations: [
    EmptyImgPipe,
    DateCustomPipe,
    AsociacionPipe,
    CodeVehiclePipe,
    CodeDriverPipe
  ],
  imports: [
    
  ],
  exports:[
    EmptyImgPipe,
    DateCustomPipe,
    AsociacionPipe,
    CodeVehiclePipe,
    CodeDriverPipe
  ]
})
export class PipesModule { }
