import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import {
    loggedInRoute,
    LoggedInComponent
} from './';

const ENTITY_STATES = [
    ...loggedInRoute
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LoggedInComponent
    ],
    entryComponents: [
        LoggedInComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class  RoctionaryLoggedInModule {}
