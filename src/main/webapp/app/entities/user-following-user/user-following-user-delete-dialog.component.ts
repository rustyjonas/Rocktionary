import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserFollowingUser } from './user-following-user.model';
import { UserFollowingUserPopupService } from './user-following-user-popup.service';
import { UserFollowingUserService } from './user-following-user.service';

@Component({
    selector: 'jhi-user-following-user-delete-dialog',
    templateUrl: './user-following-user-delete-dialog.component.html'
})
export class UserFollowingUserDeleteDialogComponent {

    userFollowingUser: UserFollowingUser;

    constructor(
        private userFollowingUserService: UserFollowingUserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userFollowingUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userFollowingUserListModification',
                content: 'Deleted an userFollowingUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-following-user-delete-popup',
    template: ''
})
export class UserFollowingUserDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userFollowingUserPopupService: UserFollowingUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userFollowingUserPopupService
                .open(UserFollowingUserDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
