import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DiscograficaComponent } from './discografica.component';
import { DiscograficaDetailComponent } from './discografica-detail.component';
import { DiscograficaPopupComponent } from './discografica-dialog.component';
import { DiscograficaDeletePopupComponent } from './discografica-delete-dialog.component';

export const discograficaRoute: Routes = [
    {
        path: 'discografica',
        component: DiscograficaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.discografica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'discografica/:id',
        component: DiscograficaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.discografica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const discograficaPopupRoute: Routes = [
    {
        path: 'discografica-new',
        component: DiscograficaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.discografica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discografica/:id/edit',
        component: DiscograficaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.discografica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discografica/:id/delete',
        component: DiscograficaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.discografica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
