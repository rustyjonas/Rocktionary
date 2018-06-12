import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BandaComponent } from './banda.component';
import { BandaDetailComponent } from './banda-detail.component';
import { BandaPopupComponent } from './banda-dialog.component';
import { BandaDeletePopupComponent } from './banda-delete-dialog.component';
import {ComentariosComponent} from "../../entitites/comentarios/comentarios.component";

export const bandaRoute: Routes = [
    {
        path: 'banda',
        component: BandaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.banda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banda/:id',
        component: BandaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.banda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'banda/:id/comentarios',
        component: ComentariosComponent
    }
];

export const bandaPopupRoute: Routes = [
    {
        path: 'banda-new',
        component: BandaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.banda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banda/:id/edit',
        component: BandaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.banda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banda/:id/delete',
        component: BandaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.banda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
