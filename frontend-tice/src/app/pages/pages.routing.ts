import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
// import { AccountSettingsComponent } from './account-settings/account-settings.component';
//import { UeducativaComponent } from './ueducativa/ueducativa.component';
// import { PromesasComponent } from './promesas/promesas.component';
// import { RxjsComponent } from './rxjs/rxjs.component';
import { PrincipalComponent } from './principal/principal.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { InscribirComponent } from './inscribir/inscribir.component';
import { ListasComponent } from './listas/listas.component';
import { AsociacionComponent } from './asociacion/asociacion.component';
import { HabilitarComponent } from './habilitar/habilitar.component';
import { ProfileComponent } from './profile/profile.component';
import { SindicatosListComponent } from './sindicatos-list/sindicatos-list.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
//import { UeducativasComponent } from './ueducativas/ueducativas.component';
import { AuthGuard } from '../guards/auth.guard';
import { AntecedenteComponent } from './antecedente/antecedente.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersComponent } from './users/users.component';
import { DriverComponent } from './driver/driver.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnersListComponent } from './owners-list/owners-list.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: PrincipalComponent, data: { titulo: 'Principal' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Mi Perfil' }},
            { path: 'inscribir/:id', component: InscribirComponent, data: { titulo: 'Registro de Conductores' }},
            { path: 'listas', component: ListasComponent, data: { titulo: 'Listas' }},
            { path: 'estadisticas', component: EstadisticasComponent, data: { titulo: 'Estadisticas' }},
            { path: 'asociacion/:id', component: AsociacionComponent, data: { titulo: 'Asociacion' }},
            { path: 'sindicatos', component: SindicatosListComponent, data: { titulo: 'Lista de Sindicatos / Asociaciones' }},
            { path: 'vehicles-list', component: VehiclesListComponent, data: { titulo: 'Lista de Vehículos' }},
            { path: 'drivers-list', component: DriversListComponent, data: { titulo: 'Lista de Conductores' }},
            { path: 'owners-list', component: OwnersListComponent, data: { titulo: 'Lista de Propietarios' }},
            //{ path: 'ueducativa/:id', component: UeducativaComponent, data: { titulo: 'Unidad Educativa' }},
            //{ path: 'ueducativas', component: UeducativasComponent, data: { titulo: 'Lista de Unidades Educativas' }},
            { path: 'habilitar', component: HabilitarComponent, data: { titulo: 'Usuarios del Sistema' }},
            { path: 'antecedente/:id', component: AntecedenteComponent, data: { titulo: 'Antecedentes del Conductor' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Temas' }},
            { path: 'change-password', component: ChangePasswordComponent, data: { titulo: 'Cambiar Contraseña' }},
            { path: 'user/:id', component: UsersComponent, data: { titulo: 'Usuario' }},
            { path: 'driver/:id', component: DriverComponent, data: { titulo: 'Conductor' }},
            { path: 'vehicle/:id', component: VehicleComponent, data: { titulo: 'Vehiculo' }},
            { path: 'owner/:id', component: OwnerComponent, data: { titulo: 'Propietario' }},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


