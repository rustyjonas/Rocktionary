import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import { RocktionaryAdminModule } from '../../admin/admin.module';
import {
    ComentarBandaService,
    ComentarBandaPopupService,
    ComentarBandaComponent,
    ComentarBandaDetailComponent,
    ComentarBandaDialogComponent,
    ComentarBandaPopupComponent,
    ComentarBandaDeletePopupComponent,
    ComentarBandaDeleteDialogComponent,
    comentarBandaRoute,
    comentarBandaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...comentarBandaRoute,
    ...comentarBandaPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RocktionaryAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComentarBandaComponent,
        ComentarBandaDetailComponent,
        ComentarBandaDialogComponent,
        ComentarBandaDeleteDialogComponent,
        ComentarBandaPopupComponent,
        ComentarBandaDeletePopupComponent,
    ],
    entryComponents: [
        ComentarBandaComponent,
        ComentarBandaDialogComponent,
        ComentarBandaPopupComponent,
        ComentarBandaDeleteDialogComponent,
        ComentarBandaDeletePopupComponent,
    ],
    providers: [
        ComentarBandaService,
        ComentarBandaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryComentarBandaModule {}
