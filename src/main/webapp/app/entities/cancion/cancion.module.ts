import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import {
    CancionService,
    CancionPopupService,
    CancionComponent,
    CancionDetailComponent,
    CancionDialogComponent,
    CancionPopupComponent,
    CancionDeletePopupComponent,
    CancionDeleteDialogComponent,
    cancionRoute,
    cancionPopupRoute,
} from './';
import {YoutubePlayerModule} from 'ngx-youtube-player';

const ENTITY_STATES = [
    ...cancionRoute,
    ...cancionPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        YoutubePlayerModule
    ],
    declarations: [
        CancionComponent,
        CancionDetailComponent,
        CancionDialogComponent,
        CancionDeleteDialogComponent,
        CancionPopupComponent,
        CancionDeletePopupComponent,
    ],
    entryComponents: [
        CancionComponent,
        CancionDialogComponent,
        CancionPopupComponent,
        CancionDeleteDialogComponent,
        CancionDeletePopupComponent,
    ],
    providers: [
        CancionService,
        CancionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryCancionModule {}
