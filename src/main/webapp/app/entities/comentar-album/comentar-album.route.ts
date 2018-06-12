import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ComentarAlbumComponent } from './comentar-album.component';
import { ComentarAlbumDetailComponent } from './comentar-album-detail.component';
import { ComentarAlbumPopupComponent } from './comentar-album-dialog.component';
import { ComentarAlbumDeletePopupComponent } from './comentar-album-delete-dialog.component';

export const comentarAlbumRoute: Routes = [
    {
        path: 'comentar-album',
        component: ComentarAlbumComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarAlbum.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comentar-album/:id',
        component: ComentarAlbumDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarAlbum.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const comentarAlbumPopupRoute: Routes = [
    {
        path: 'comentar-album-new',
        component: ComentarAlbumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comentar-album/:id/edit',
        component: ComentarAlbumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comentar-album/:id/delete',
        component: ComentarAlbumDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.comentarAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
