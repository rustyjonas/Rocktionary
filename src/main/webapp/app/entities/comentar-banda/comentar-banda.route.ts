import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ComentarBandaComponent } from './comentar-banda.component';
import { ComentarBandaDetailComponent } from './comentar-banda-detail.component';
import { ComentarBandaPopupComponent } from './comentar-banda-dialog.component';
import { ComentarBandaDeletePopupComponent } from './comentar-banda-delete-dialog.component';

export const comentarBandaRoute: Routes = [
    {
        path: 'comentar-banda',
        component: ComentarBandaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarBanda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comentar-banda/:id',
        component: ComentarBandaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarBanda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const comentarBandaPopupRoute: Routes = [
    {
        path: 'comentar-banda-new',
        component: ComentarBandaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarBanda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comentar-banda/:id/edit',
        component: ComentarBandaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarBanda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comentar-banda/:id/delete',
        component: ComentarBandaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarBanda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
