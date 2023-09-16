import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PrincipalComponent } from './principal/principal.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ListasComponent } from './listas/listas.component';
import { AsociacionComponent } from './asociacion/asociacion.component';
import { HabilitarComponent } from './habilitar/habilitar.component';
import { ProfileComponent } from './profile/profile.component';
import { SindicatosListComponent } from './sindicatos-list/sindicatos-list.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { AntecedenteComponent } from './antecedente/antecedente.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersComponent } from './users/users.component';
import { DriverComponent } from './driver/driver.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { OwnerComponent } from './owner/owner.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: PrincipalComponent, data: { titulo: 'Principal' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Mi Perfil' }},
            { path: 'listas', component: ListasComponent, data: { titulo: 'Listas' }},
            { path: 'statistics', component: EstadisticasComponent, data: { titulo: 'Estadisticas' }},
            { path: 'asociacion/:id', component: AsociacionComponent, data: { titulo: 'Asociacion' }},
            { path: 'unions', component: SindicatosListComponent, data: { titulo: 'Lista de Sindicatos / Asociaciones' }},
            { path: 'vehicles', component: VehiclesListComponent, data: { titulo: 'Lista de Vehículos' }},
            { path: 'drivers', component: DriversListComponent, data: { titulo: 'Lista de Conductores' }},
            { path: 'roles', component: HabilitarComponent, data: { titulo: 'Usuarios del Sistema' }},
            { path: 'antecedente/:id', component: AntecedenteComponent, data: { titulo: 'Antecedentes del Conductor' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Temas' }},
            { path: 'password', component: ChangePasswordComponent, data: { titulo: 'Cambiar Contraseña' }},
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


