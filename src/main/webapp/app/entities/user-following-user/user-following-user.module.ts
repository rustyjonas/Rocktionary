import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocktionarySharedModule } from '../../shared';
import { RocktionaryAdminModule } from '../../admin/admin.module';
import {
    UserFollowingUserService,
    UserFollowingUserPopupService,
    UserFollowingUserComponent,
    UserFollowingUserDetailComponent,
    UserFollowingUserDialogComponent,
    UserFollowingUserPopupComponent,
    UserFollowingUserDeletePopupComponent,
    UserFollowingUserDeleteDialogComponent,
    userFollowingUserRoute,
    userFollowingUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userFollowingUserRoute,
    ...userFollowingUserPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RocktionaryAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserFollowingUserComponent,
        UserFollowingUserDetailComponent,
        UserFollowingUserDialogComponent,
        UserFollowingUserDeleteDialogComponent,
        UserFollowingUserPopupComponent,
        UserFollowingUserDeletePopupComponent,
    ],
    entryComponents: [
        UserFollowingUserComponent,
        UserFollowingUserDialogComponent,
        UserFollowingUserPopupComponent,
        UserFollowingUserDeleteDialogComponent,
        UserFollowingUserDeletePopupComponent,
    ],
    providers: [
        UserFollowingUserService,
        UserFollowingUserPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryUserFollowingUserModule {}
