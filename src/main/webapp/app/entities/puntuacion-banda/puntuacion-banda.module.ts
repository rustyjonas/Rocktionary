import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import { RocktionaryAdminModule } from '../../admin/admin.module';
import {
    PuntuacionBandaService,
    PuntuacionBandaPopupService,
    PuntuacionBandaComponent,
    PuntuacionBandaDetailComponent,
    PuntuacionBandaDialogComponent,
    PuntuacionBandaPopupComponent,
    PuntuacionBandaDeletePopupComponent,
    PuntuacionBandaDeleteDialogComponent,
    puntuacionBandaRoute,
    puntuacionBandaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...puntuacionBandaRoute,
    ...puntuacionBandaPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RocktionaryAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PuntuacionBandaComponent,
        PuntuacionBandaDetailComponent,
        PuntuacionBandaDialogComponent,
        PuntuacionBandaDeleteDialogComponent,
        PuntuacionBandaPopupComponent,
        PuntuacionBandaDeletePopupComponent,
    ],
    entryComponents: [
        PuntuacionBandaComponent,
        PuntuacionBandaDialogComponent,
        PuntuacionBandaPopupComponent,
        PuntuacionBandaDeleteDialogComponent,
        PuntuacionBandaDeletePopupComponent,
    ],
    providers: [
        PuntuacionBandaService,
        PuntuacionBandaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryPuntuacionBandaModule {}
