import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UserFollowingUser } from './user-following-user.model';
import { UserFollowingUserService } from './user-following-user.service';

@Injectable()
export class UserFollowingUserPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private userFollowingUserService: UserFollowingUserService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.userFollowingUserService.find(id)
                    .subscribe((userFollowingUserResponse: HttpResponse<UserFollowingUser>) => {
                        const userFollowingUser: UserFollowingUser = userFollowingUserResponse.body;
                        userFollowingUser.since = this.datePipe
                            .transform(userFollowingUser.since, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.userFollowingUserModalRef(component, userFollowingUser);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.userFollowingUserModalRef(component, new UserFollowingUser());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userFollowingUserModalRef(component: Component, userFollowingUser: UserFollowingUser): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userFollowingUser = userFollowingUser;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
