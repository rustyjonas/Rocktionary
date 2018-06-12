import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserFollowingUser } from './user-following-user.model';
import { UserFollowingUserService } from './user-following-user.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-user-following-user',
    templateUrl: './user-following-user.component.html'
})
export class UserFollowingUserComponent implements OnInit, OnDestroy {
userFollowingUsers: UserFollowingUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userFollowingUserService: UserFollowingUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userFollowingUserService.query().subscribe(
            (res: HttpResponse<UserFollowingUser[]>) => {
                this.userFollowingUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserFollowingUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserFollowingUser) {
        return item.id;
    }
    registerChangeInUserFollowingUsers() {
        this.eventSubscriber = this.eventManager.subscribe('userFollowingUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
