import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ComentarCancionComponent } from './comentar-cancion.component';
import { ComentarCancionDetailComponent } from './comentar-cancion-detail.component';
import { ComentarCancionPopupComponent } from './comentar-cancion-dialog.component';
import { ComentarCancionDeletePopupComponent } from './comentar-cancion-delete-dialog.component';

export const comentarCancionRoute: Routes = [
    {
        path: 'comentar-cancion',
        component: ComentarCancionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarCancion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comentar-cancion/:id',
        component: ComentarCancionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarCancion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const comentarCancionPopupRoute: Routes = [
    {
        path: 'comentar-cancion-new',
        component: ComentarCancionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarCancion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comentar-cancion/:id/edit',
        component: ComentarCancionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarCancion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comentar-cancion/:id/delete',
        component: ComentarCancionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarCancion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
