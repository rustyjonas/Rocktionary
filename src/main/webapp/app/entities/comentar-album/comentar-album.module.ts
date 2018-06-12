import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import { RocktionaryAdminModule } from '../../admin/admin.module';
import {
    ComentarAlbumService,
    ComentarAlbumPopupService,
    ComentarAlbumComponent,
    ComentarAlbumDetailComponent,
    ComentarAlbumDialogComponent,
    ComentarAlbumPopupComponent,
    ComentarAlbumDeletePopupComponent,
    ComentarAlbumDeleteDialogComponent,
    comentarAlbumRoute,
    comentarAlbumPopupRoute,
} from './';

const ENTITY_STATES = [
    ...comentarAlbumRoute,
    ...comentarAlbumPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RocktionaryAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComentarAlbumComponent,
        ComentarAlbumDetailComponent,
        ComentarAlbumDialogComponent,
        ComentarAlbumDeleteDialogComponent,
        ComentarAlbumPopupComponent,
        ComentarAlbumDeletePopupComponent,
    ],
    entryComponents: [
        ComentarAlbumComponent,
        ComentarAlbumDialogComponent,
        ComentarAlbumPopupComponent,
        ComentarAlbumDeleteDialogComponent,
        ComentarAlbumDeletePopupComponent,
    ],
    providers: [
        ComentarAlbumService,
        ComentarAlbumPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryComentarAlbumModule {}
