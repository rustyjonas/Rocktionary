import { Routes } from '@angular/router';
import { EquipoComponent } from './equipo.component';


export const equipoRoute: Routes = [
    {
        path: 'equipo',
        component: EquipoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.equipo.title'
        }
    }
];

