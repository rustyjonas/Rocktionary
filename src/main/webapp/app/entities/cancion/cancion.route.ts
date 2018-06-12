import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CancionComponent } from './cancion.component';
import { CancionDetailComponent } from './cancion-detail.component';
import { CancionPopupComponent } from './cancion-dialog.component';
import { CancionDeletePopupComponent } from './cancion-delete-dialog.component';

export const cancionRoute: Routes = [
    {
        path: 'cancion',
        component: CancionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.cancion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cancion/:id',
        component: CancionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.cancion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cancionPopupRoute: Routes = [
    {
        path: 'cancion-new',
        component: CancionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.cancion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cancion/:id/edit',
        component: CancionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.cancion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cancion/:id/delete',
        component: CancionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.cancion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
