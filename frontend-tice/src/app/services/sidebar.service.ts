import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Filiación',
      icono: 'ti-pencil-alt2',
      submenu: [
        //{ titulo: 'Conductor_Old', url: '/dashboard/inscribir/0' },
        { titulo: 'Conductor', url: '/dashboard/driver/0' },
        //{ titulo: 'Vehiculo', url: '/dashboard/vehicle/0' },
        //{ titulo: 'Propietario', url: '/dashboard/owner/0' },
        { titulo: 'Sindicato', url: '/dashboard/asociacion/0' },
      ]
    },
    {
      titulo: 'Listas',
      icono: 'ti-list',
      submenu: [
        { titulo: 'Conductores', url: '/dashboard/drivers' },
        { titulo: 'Vehículos', url: '/dashboard/vehicles' },
        { titulo: 'Sindicatos', url: '/dashboard/unions' },
        //{ titulo: 'Propietarios', url: '/dashboard/owners-list' },
        //{ titulo: 'Unidades Educativas', url: '/dashboard/ueducativas' },
        //{ titulo: 'Movilidad / asociacion', url: '/dashboard/movilidad-asoc' },
        { titulo: 'Usuarios del Sistema', url: '/dashboard/roles' },
        // { titulo: 'Principal', url: '/' },
        // { titulo: 'Gráficas', url: 'grafica1' },
        // { titulo: 'rxjs', url: 'rxjs' },
        // { titulo: 'Promesas', url: 'promesas' },
        // { titulo: 'ProgressBar', url: 'progress' },
      ]
    },
  ];

  constructor() { }
}
