import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PuntuacionCancionComponent } from './puntuacion-cancion.component';
import { PuntuacionCancionDetailComponent } from './puntuacion-cancion-detail.component';
import { PuntuacionCancionPopupComponent } from './puntuacion-cancion-dialog.component';
import { PuntuacionCancionDeletePopupComponent } from './puntuacion-cancion-delete-dialog.component';

export const puntuacionCancionRoute: Routes = [
    {
        path: 'puntuacion-cancion',
        component: PuntuacionCancionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionCancion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'puntuacion-cancion/:id',
        component: PuntuacionCancionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionCancion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const puntuacionCancionPopupRoute: Routes = [
    {
        path: 'puntuacion-cancion-new',
        component: PuntuacionCancionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionCancion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'puntuacion-cancion/:id/edit',
        component: PuntuacionCancionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionCancion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'puntuacion-cancion/:id/delete',
        component: PuntuacionCancionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionCancion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
