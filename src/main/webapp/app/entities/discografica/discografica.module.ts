import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import {
    DiscograficaService,
    DiscograficaPopupService,
    DiscograficaComponent,
    DiscograficaDetailComponent,
    DiscograficaDialogComponent,
    DiscograficaPopupComponent,
    DiscograficaDeletePopupComponent,
    DiscograficaDeleteDialogComponent,
    discograficaRoute,
    discograficaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...discograficaRoute,
    ...discograficaPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DiscograficaComponent,
        DiscograficaDetailComponent,
        DiscograficaDialogComponent,
        DiscograficaDeleteDialogComponent,
        DiscograficaPopupComponent,
        DiscograficaDeletePopupComponent,
    ],
    entryComponents: [
        DiscograficaComponent,
        DiscograficaDialogComponent,
        DiscograficaPopupComponent,
        DiscograficaDeleteDialogComponent,
        DiscograficaDeletePopupComponent,
    ],
    providers: [
        DiscograficaService,
        DiscograficaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryDiscograficaModule {}
