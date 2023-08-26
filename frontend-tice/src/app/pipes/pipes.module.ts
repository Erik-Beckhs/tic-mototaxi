import { NgModule } from '@angular/core';
import { EmptyImgPipe } from './empty-img.pipe';
//import { UeducativasPipe } from './ueducativas.pipe';
import { AsociacionPipe } from './asociacion.pipe';

@NgModule({
  declarations: [
    EmptyImgPipe,
    //UeducativasPipe,
    AsociacionPipe
  ],
  imports: [
    
  ],
  exports:[
    EmptyImgPipe,
    //UeducativasPipe,
    AsociacionPipe
  ]
})
export class PipesModule { }
