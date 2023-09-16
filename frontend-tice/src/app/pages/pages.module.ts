// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DialogsModule } from '../dialogs/dialogs.module';
import { ComponentsModule } from '../components/components.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

//componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PrincipalComponent } from './principal/principal.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ListasComponent } from './listas/listas.component';
import { AsociacionComponent } from './asociacion/asociacion.component';
import { HabilitarComponent } from './habilitar/habilitar.component';
import { ProfileComponent } from './profile/profile.component';
import { SindicatosListComponent } from './sindicatos-list/sindicatos-list.component';
//import { UeducativaComponent } from './ueducativa/ueducativa.component';
//import { UeducativasComponent } from './ueducativas/ueducativas.component';
import { ImprimirTICEComponent } from './imprimir-tice/imprimir-tice.component';
import { AntecedenteComponent } from './antecedente/antecedente.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersComponent } from './users/users.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DriverComponent } from './driver/driver.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnersListComponent } from './owners-list/owners-list.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    RxjsComponent,
    PrincipalComponent,
    EstadisticasComponent,
    ListasComponent,
    AsociacionComponent,
    HabilitarComponent,
    ProfileComponent,
    SindicatosListComponent,
    // UeducativaComponent,
    // UeducativasComponent,
    ImprimirTICEComponent,
    AntecedenteComponent,
    ChangePasswordComponent,
    UsersComponent,
    DriverComponent,
    VehiclesListComponent,
    DriversListComponent,
    VehicleComponent,
    OwnerComponent,
    OwnersListComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    AsociacionComponent,
    HabilitarComponent,
    SindicatosListComponent,
    ProfileComponent,
    ImprimirTICEComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    NgxQRCodeModule, 
    MatCardModule,
    HttpClientModule,
    PipesModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTabsModule,
    DialogsModule,
    MatChipsModule
  ]
})
export class PagesModule { }
