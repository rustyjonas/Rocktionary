import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import { RocktionaryAdminModule } from '../../admin/admin.module';
import {
    PuntuacionCancionService,
    PuntuacionCancionPopupService,
    PuntuacionCancionComponent,
    PuntuacionCancionDetailComponent,
    PuntuacionCancionDialogComponent,
    PuntuacionCancionPopupComponent,
    PuntuacionCancionDeletePopupComponent,
    PuntuacionCancionDeleteDialogComponent,
    puntuacionCancionRoute,
    puntuacionCancionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...puntuacionCancionRoute,
    ...puntuacionCancionPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RocktionaryAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PuntuacionCancionComponent,
        PuntuacionCancionDetailComponent,
        PuntuacionCancionDialogComponent,
        PuntuacionCancionDeleteDialogComponent,
        PuntuacionCancionPopupComponent,
        PuntuacionCancionDeletePopupComponent,
    ],
    entryComponents: [
        PuntuacionCancionComponent,
        PuntuacionCancionDialogComponent,
        PuntuacionCancionPopupComponent,
        PuntuacionCancionDeleteDialogComponent,
        PuntuacionCancionDeletePopupComponent,
    ],
    providers: [
        PuntuacionCancionService,
        PuntuacionCancionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryPuntuacionCancionModule {}
