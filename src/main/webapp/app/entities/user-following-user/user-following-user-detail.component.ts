import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserFollowingUser } from './user-following-user.model';
import { UserFollowingUserService } from './user-following-user.service';

@Component({
    selector: 'jhi-user-following-user-detail',
    templateUrl: './user-following-user-detail.component.html'
})
export class UserFollowingUserDetailComponent implements OnInit, OnDestroy {

    userFollowingUser: UserFollowingUser;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userFollowingUserService: UserFollowingUserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserFollowingUsers();
    }

    load(id) {
        this.userFollowingUserService.find(id)
            .subscribe((userFollowingUserResponse: HttpResponse<UserFollowingUser>) => {
                this.userFollowingUser = userFollowingUserResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserFollowingUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userFollowingUserListModification',
            (response) => this.load(this.userFollowingUser.id)
        );
    }
}
