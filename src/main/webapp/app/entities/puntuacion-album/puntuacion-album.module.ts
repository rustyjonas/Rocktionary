import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import { RocktionaryAdminModule } from '../../admin/admin.module';
import {
    PuntuacionAlbumService,
    PuntuacionAlbumPopupService,
    PuntuacionAlbumComponent,
    PuntuacionAlbumDetailComponent,
    PuntuacionAlbumDialogComponent,
    PuntuacionAlbumPopupComponent,
    PuntuacionAlbumDeletePopupComponent,
    PuntuacionAlbumDeleteDialogComponent,
    puntuacionAlbumRoute,
    puntuacionAlbumPopupRoute,
} from './';

const ENTITY_STATES = [
    ...puntuacionAlbumRoute,
    ...puntuacionAlbumPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RocktionaryAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PuntuacionAlbumComponent,
        PuntuacionAlbumDetailComponent,
        PuntuacionAlbumDialogComponent,
        PuntuacionAlbumDeleteDialogComponent,
        PuntuacionAlbumPopupComponent,
        PuntuacionAlbumDeletePopupComponent,
    ],
    entryComponents: [
        PuntuacionAlbumComponent,
        PuntuacionAlbumDialogComponent,
        PuntuacionAlbumPopupComponent,
        PuntuacionAlbumDeleteDialogComponent,
        PuntuacionAlbumDeletePopupComponent,
    ],
    providers: [
        PuntuacionAlbumService,
        PuntuacionAlbumPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryPuntuacionAlbumModule {}
