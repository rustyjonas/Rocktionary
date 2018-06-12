import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import {
    ComponenteService,
    ComponentePopupService,
    ComponenteComponent,
    ComponenteDetailComponent,
    ComponenteDialogComponent,
    ComponentePopupComponent,
    ComponenteDeletePopupComponent,
    ComponenteDeleteDialogComponent,
    componenteRoute,
    componentePopupRoute,
} from './';

const ENTITY_STATES = [
    ...componenteRoute,
    ...componentePopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComponenteComponent,
        ComponenteDetailComponent,
        ComponenteDialogComponent,
        ComponenteDeleteDialogComponent,
        ComponentePopupComponent,
        ComponenteDeletePopupComponent,
    ],
    entryComponents: [
        ComponenteComponent,
        ComponenteDialogComponent,
        ComponentePopupComponent,
        ComponenteDeleteDialogComponent,
        ComponenteDeletePopupComponent,
    ],
    providers: [
        ComponenteService,
        ComponentePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryComponenteModule {}
