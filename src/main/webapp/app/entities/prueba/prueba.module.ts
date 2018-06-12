import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import {
    PruebaService,
    PruebaPopupService,
    PruebaComponent,
    PruebaDetailComponent,
    PruebaDialogComponent,
    PruebaPopupComponent,
    PruebaDeletePopupComponent,
    PruebaDeleteDialogComponent,
    pruebaRoute,
    pruebaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pruebaRoute,
    ...pruebaPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PruebaComponent,
        PruebaDetailComponent,
        PruebaDialogComponent,
        PruebaDeleteDialogComponent,
        PruebaPopupComponent,
        PruebaDeletePopupComponent,
    ],
    entryComponents: [
        PruebaComponent,
        PruebaDialogComponent,
        PruebaPopupComponent,
        PruebaDeleteDialogComponent,
        PruebaDeletePopupComponent,
    ],
    providers: [
        PruebaService,
        PruebaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryPruebaModule {}
