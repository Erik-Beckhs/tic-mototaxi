import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogVehicleComponent } from './dialog-vehicle/dialog-vehicle.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import  {MatButtonModule } from '@angular/material/button';
import { DialogListOwnerComponent } from './dialog-list-owner/dialog-list-owner.component';
import { DialogSearchComponent } from './dialog-search/dialog-search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DialogVehicleComponent,
    DialogListOwnerComponent,
    DialogSearchComponent,
    
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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ]
})
export class DialogsModule { }


