import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import {
    equipoRoute,
    EquipoComponent
} from './';

const ENTITY_STATES = [
    ...equipoRoute
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EquipoComponent
    ],
    entryComponents: [
        EquipoComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryEquipoModule {}
