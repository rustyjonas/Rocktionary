import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PuntuacionAlbumComponent } from './puntuacion-album.component';
import { PuntuacionAlbumDetailComponent } from './puntuacion-album-detail.component';
import { PuntuacionAlbumPopupComponent } from './puntuacion-album-dialog.component';
import { PuntuacionAlbumDeletePopupComponent } from './puntuacion-album-delete-dialog.component';

export const puntuacionAlbumRoute: Routes = [
    {
        path: 'puntuacion-album',
        component: PuntuacionAlbumComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionAlbum.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'puntuacion-album/:id',
        component: PuntuacionAlbumDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionAlbum.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const puntuacionAlbumPopupRoute: Routes = [
    {
        path: 'puntuacion-album-new',
        component: PuntuacionAlbumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'puntuacion-album/:id/edit',
        component: PuntuacionAlbumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'puntuacion-album/:id/delete',
        component: PuntuacionAlbumDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.puntuacionAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
