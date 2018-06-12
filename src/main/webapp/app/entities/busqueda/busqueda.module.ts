import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import {
    busquedaRoute,
    BusquedaComponent
} from './';

const ENTITY_STATES = [
    ...busquedaRoute
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BusquedaComponent
    ],
    entryComponents: [
        BusquedaComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryEquipoModule {}
