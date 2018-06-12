import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PruebaComponent } from './prueba.component';
import { PruebaDetailComponent } from './prueba-detail.component';
import { PruebaPopupComponent } from './prueba-dialog.component';
import { PruebaDeletePopupComponent } from './prueba-delete-dialog.component';

export const pruebaRoute: Routes = [
    {
        path: 'prueba',
        component: PruebaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.prueba.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'prueba/:id',
        component: PruebaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.prueba.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pruebaPopupRoute: Routes = [
    {
        path: 'prueba-new',
        component: PruebaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.prueba.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prueba/:id/edit',
        component: PruebaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.prueba.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prueba/:id/delete',
        component: PruebaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.prueba.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
