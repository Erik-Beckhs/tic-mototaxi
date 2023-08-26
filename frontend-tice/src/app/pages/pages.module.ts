// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/app/pipes/pipes.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';

//componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PrincipalComponent } from './principal/principal.component';
import { AboutComponent } from './about/about.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { InscribirComponent } from './inscribir/inscribir.component';
import { ListasComponent } from './listas/listas.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { AsociacionComponent } from './asociacion/asociacion.component';
import { MovilidadAsocComponent } from './movilidad-asoc/movilidad-asoc.component';
import { HabilitarComponent } from './habilitar/habilitar.component';
import { ProfileComponent } from './profile/profile.component';
import { SindicatosListComponent } from './sindicatos-list/sindicatos-list.component';
//import { UeducativaComponent } from './ueducativa/ueducativa.component';
//import { UeducativasComponent } from './ueducativas/ueducativas.component';
import { EditConductorComponent } from './edit-conductor/edit-conductor.component';
import { ImprimirTICEComponent } from './imprimir-tice/imprimir-tice.component';
import { AntecedenteComponent } from './antecedente/antecedente.component';
import { AntecedenteDialogComponent } from './antecedente-dialog/antecedente-dialog.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersComponent } from './users/users.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PrincipalComponent,
    AboutComponent,
    EstadisticasComponent,
    InscribirComponent,
    ListasComponent,
    ConsultarComponent,
    AsociacionComponent,
    MovilidadAsocComponent,
    HabilitarComponent,
    ProfileComponent,
    SindicatosListComponent,
    // UeducativaComponent,
    // UeducativasComponent,
    EditConductorComponent,
    ImprimirTICEComponent,
    AntecedenteComponent,
    AntecedenteDialogComponent,
    ChangePasswordComponent,
    UsersComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    AsociacionComponent,
    MovilidadAsocComponent,
    HabilitarComponent,
    SindicatosListComponent,
    ProfileComponent,
    // UeducativaComponent,
    // UeducativasComponent,
    EditConductorComponent,
    InscribirComponent,
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
    MatTabsModule
  ]
})
export class PagesModule { }
