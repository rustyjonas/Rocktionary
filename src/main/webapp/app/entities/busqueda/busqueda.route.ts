import { Routes } from '@angular/router';

import { BusquedaComponent } from './';


export const busquedaRoute: Routes = [
    {
        path: 'busqueda',
        component: BusquedaComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    }
];
