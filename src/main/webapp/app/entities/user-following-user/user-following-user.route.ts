import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UserFollowingUserComponent } from './user-following-user.component';
import { UserFollowingUserDetailComponent } from './user-following-user-detail.component';
import { UserFollowingUserPopupComponent } from './user-following-user-dialog.component';
import { UserFollowingUserDeletePopupComponent } from './user-following-user-delete-dialog.component';

export const userFollowingUserRoute: Routes = [
    {
        path: 'user-following-user',
        component: UserFollowingUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.userFollowingUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-following-user/:id',
        component: UserFollowingUserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.userFollowingUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userFollowingUserPopupRoute: Routes = [
    {
        path: 'user-following-user-new',
        component: UserFollowingUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.userFollowingUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-following-user/:id/edit',
        component: UserFollowingUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.userFollowingUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-following-user/:id/delete',
        component: UserFollowingUserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.userFollowingUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
