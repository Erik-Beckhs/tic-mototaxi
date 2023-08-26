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
import { AccountSettingsComponent } from './account-settings/account-settings.component';
//import { UeducativasComponent } from './ueducativas/ueducativas.component';
import { AuthGuard } from '../guards/auth.guard';
import { AntecedenteComponent } from './antecedente/antecedente.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: PrincipalComponent, data: { titulo: 'Principal' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Mi Perfil' }},
            { path: 'inscribir/:id', component: InscribirComponent, data: { titulo: 'Registro de Conductores' }},
            { path: 'consultar', component: ConsultarComponent, data: { titulo: 'Lista de Conductores' }},
            { path: 'about', component: AboutComponent, data: { titulo: 'Acerca de' }},
            { path: 'listas', component: ListasComponent, data: { titulo: 'Listas' }},
            { path: 'estadisticas', component: EstadisticasComponent, data: { titulo: 'Estadisticas' }},
            { path: 'asociacion/:id', component: AsociacionComponent, data: { titulo: 'Asociacion' }},
            { path: 'sindicatos', component: SindicatosListComponent, data: { titulo: 'Lista de Sindicatos / Asociaciones' }},
            //{ path: 'ueducativa/:id', component: UeducativaComponent, data: { titulo: 'Unidad Educativa' }},
            //{ path: 'ueducativas', component: UeducativasComponent, data: { titulo: 'Lista de Unidades Educativas' }},
            { path: 'movilidad-asoc', component: MovilidadAsocComponent, data: { titulo: 'Asociaciones y Movilidades' }},
            { path: 'habilitar', component: HabilitarComponent, data: { titulo: 'Usuarios del Sistema' }},
            { path: 'antecedente/:id', component: AntecedenteComponent, data: { titulo: 'Antecedentes del Conductor' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Temas' }},
            { path: 'change-password', component: ChangePasswordComponent, data: { titulo: 'Cambiar Contraseña' }},
            { path: 'user/:id', component: UsersComponent, data: { titulo: 'Usuario' }},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


