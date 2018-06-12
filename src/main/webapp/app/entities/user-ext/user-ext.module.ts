import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import { RocktionaryAdminModule } from '../../admin/admin.module';
import {
    UserExtService,
    UserExtPopupService,
    UserExtComponent,
    UserExtDetailComponent,
    UserExtDialogComponent,
    UserExtPopupComponent,
    UserExtDeletePopupComponent,
    UserExtDeleteDialogComponent,
    userExtRoute,
    userExtPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userExtRoute,
    ...userExtPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RocktionaryAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserExtComponent,
        UserExtDetailComponent,
        UserExtDialogComponent,
        UserExtDeleteDialogComponent,
        UserExtPopupComponent,
        UserExtDeletePopupComponent,
    ],
    entryComponents: [
        UserExtComponent,
        UserExtDialogComponent,
        UserExtPopupComponent,
        UserExtDeleteDialogComponent,
        UserExtDeletePopupComponent,
    ],
    providers: [
        UserExtService,
        UserExtPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryUserExtModule {}
