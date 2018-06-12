import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PuntuacionBandaComponent } from './puntuacion-banda.component';
import { PuntuacionBandaDetailComponent } from './puntuacion-banda-detail.component';
import { PuntuacionBandaPopupComponent } from './puntuacion-banda-dialog.component';
import { PuntuacionBandaDeletePopupComponent } from './puntuacion-banda-delete-dialog.component';

export const puntuacionBandaRoute: Routes = [
    {
        path: 'puntuacion-banda',
        component: PuntuacionBandaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionBanda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'puntuacion-banda/:id',
        component: PuntuacionBandaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionBanda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const puntuacionBandaPopupRoute: Routes = [
    {
        path: 'puntuacion-banda-new',
        component: PuntuacionBandaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionBanda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'puntuacion-banda/:id/edit',
        component: PuntuacionBandaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionBanda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'puntuacion-banda/:id/delete',
        component: PuntuacionBandaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionBanda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
