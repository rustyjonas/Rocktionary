import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserFollowingUser } from './user-following-user.model';
import { UserFollowingUserPopupService } from './user-following-user-popup.service';
import { UserFollowingUserService } from './user-following-user.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-user-following-user-dialog',
    templateUrl: './user-following-user-dialog.component.html'
})
export class UserFollowingUserDialogComponent implements OnInit {

    userFollowingUser: UserFollowingUser;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userFollowingUserService: UserFollowingUserService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userFollowingUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userFollowingUserService.update(this.userFollowingUser));
        } else {
            this.subscribeToSaveResponse(
                this.userFollowingUserService.create(this.userFollowingUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserFollowingUser>>) {
        result.subscribe((res: HttpResponse<UserFollowingUser>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserFollowingUser) {
        this.eventManager.broadcast({ name: 'userFollowingUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-following-user-popup',
    template: ''
})
export class UserFollowingUserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userFollowingUserPopupService: UserFollowingUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userFollowingUserPopupService
                    .open(UserFollowingUserDialogComponent as Component, params['id']);
            } else {
                this.userFollowingUserPopupService
                    .open(UserFollowingUserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
