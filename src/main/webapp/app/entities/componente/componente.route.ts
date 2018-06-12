import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ComponenteComponent } from './componente.component';
import { ComponenteDetailComponent } from './componente-detail.component';
import { ComponentePopupComponent } from './componente-dialog.component';
import { ComponenteDeletePopupComponent } from './componente-delete-dialog.component';

export const componenteRoute: Routes = [
    {
        path: 'componente',
        component: ComponenteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.componente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'componente/:id',
        component: ComponenteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.componente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const componentePopupRoute: Routes = [
    {
        path: 'componente-new',
        component: ComponentePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.componente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'componente/:id/edit',
        component: ComponentePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.componente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'componente/:id/delete',
        component: ComponenteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.componente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
