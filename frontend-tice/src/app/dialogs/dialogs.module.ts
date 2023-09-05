import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogVehicleComponent } from './dialog-vehicle/dialog-vehicle.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import  {MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DialogVehicleComponent
  ],
  exports:[
    DialogVehicleComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class DialogsModule { }


