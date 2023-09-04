import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ChartsModule } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { DonaComponent } from './dona/dona.component';
import { BarChartComponent } from './graficos/bar-chart/bar-chart.component';
import { BarChart2Component } from './graficos/bar-chart2/bar-chart2.component';
import { TableDriversComponent } from './table-drivers/table-drivers.component';
import { FormDriverComponent } from './form-driver/form-driver.component';
import { FormAsociacionComponent } from './form-asociacion/form-asociacion.component';
import { FormVehicleComponent } from './form-vehicle/form-vehicle.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableCardsComponent } from './table-cards/table-cards.component';
import { TableAntecedentesComponent } from './table-antecedentes/table-antecedentes.component';
import { AntecedenteDialogComponent } from './antecedente-dialog/antecedente-dialog.component';
import { TableVehiclesComponent } from './table-vehicles/table-vehicles.component';
import { FormOwnerComponent } from './form-owner/form-owner.component';
import { TableOwnersComponent } from './table-owners/table-owners.component';

@NgModule({
  declarations: [
    DonaComponent,
    BarChartComponent,
    BarChart2Component,
    TableDriversComponent,
    FormAsociacionComponent,
    FormDriverComponent,
    FormVehicleComponent,
    TableCardsComponent,
    TableAntecedentesComponent,
    AntecedenteDialogComponent,
    TableVehiclesComponent,
    FormOwnerComponent,
    TableOwnersComponent
  ],
  exports: [
    DonaComponent,
    BarChartComponent,
    BarChart2Component,
    TableDriversComponent,
    FormDriverComponent,
    FormAsociacionComponent,
    FormVehicleComponent,
    TableCardsComponent,
    TableAntecedentesComponent,
    AntecedenteDialogComponent,
    TableVehiclesComponent,
    TableOwnersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    PipesModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class ComponentsModule { }
