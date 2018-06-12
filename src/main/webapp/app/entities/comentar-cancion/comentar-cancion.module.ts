import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import { RocktionaryAdminModule } from '../../admin/admin.module';
import {
    ComentarCancionService,
    ComentarCancionPopupService,
    ComentarCancionComponent,
    ComentarCancionDetailComponent,
    ComentarCancionDialogComponent,
    ComentarCancionPopupComponent,
    ComentarCancionDeletePopupComponent,
    ComentarCancionDeleteDialogComponent,
    comentarCancionRoute,
    comentarCancionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...comentarCancionRoute,
    ...comentarCancionPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RocktionaryAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComentarCancionComponent,
        ComentarCancionDetailComponent,
        ComentarCancionDialogComponent,
        ComentarCancionDeleteDialogComponent,
        ComentarCancionPopupComponent,
        ComentarCancionDeletePopupComponent,
    ],
    entryComponents: [
        ComentarCancionComponent,
        ComentarCancionDialogComponent,
        ComentarCancionPopupComponent,
        ComentarCancionDeleteDialogComponent,
        ComentarCancionDeletePopupComponent,
    ],
    providers: [
        ComentarCancionService,
        ComentarCancionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryComentarCancionModule {}
