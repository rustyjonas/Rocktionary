import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WindowService } from '../windowref.service'

import { RocktionarySharedModule } from '../shared';
import {
    HOME_ROUTE,
    HomeComponent,
    HomeService
} from './';
import {ParallaxComponent} from "../parallax/parallax.component";

@NgModule({
    imports: [
        RocktionarySharedModule,
        RouterModule.forChild(HOME_ROUTE)
    ],
    declarations: [
        HomeComponent
    ],
    entryComponents: [
    ],
    providers: [
        HomeService,
        WindowService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryHomeModule {}
