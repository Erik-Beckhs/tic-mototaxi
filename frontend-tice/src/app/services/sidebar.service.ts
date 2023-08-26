import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Empadronamiento',
      icono: 'ti-pencil-alt2',
      submenu: [
        { titulo: 'Conductor', url: '/dashboard/inscribir/0' },
        { titulo: 'Sindicato / Asociación', url: '/dashboard/asociacion/0' },
      ]
    },
    {
      titulo: 'Listas',
      icono: 'ti-list',
      submenu: [
        { titulo: 'Conductores', url: '/dashboard/consultar' },
        { titulo: 'Sindicatos / Asociaciones', url: '/dashboard/sindicatos' },
        //{ titulo: 'Unidades Educativas', url: '/dashboard/ueducativas' },
        //{ titulo: 'Movilidad / asociacion', url: '/dashboard/movilidad-asoc' },
        { titulo: 'Usuarios del Sistema', url: '/dashboard/habilitar' },
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
