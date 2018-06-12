import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComentarCancion } from './comentar-cancion.model';
import { ComentarCancionPopupService } from './comentar-cancion-popup.service';
import { ComentarCancionService } from './comentar-cancion.service';
import { User, UserService } from '../../shared';
import { Cancion, CancionService } from '../cancion';

@Component({
    selector: 'jhi-comentar-cancion-dialog',
    templateUrl: './comentar-cancion-dialog.component.html'
})
export class ComentarCancionDialogComponent implements OnInit {

    comentarCancion: ComentarCancion;
    isSaving: boolean;

    users: User[];

    cancions: Cancion[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private comentarCancionService: ComentarCancionService,
        private userService: UserService,
        private cancionService: CancionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cancionService.query()
            .subscribe((res: HttpResponse<Cancion[]>) => { this.cancions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.comentarCancion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.comentarCancionService.update(this.comentarCancion));
        } else {
            this.subscribeToSaveResponse(
                this.comentarCancionService.create(this.comentarCancion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComentarCancion>>) {
        result.subscribe((res: HttpResponse<ComentarCancion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComentarCancion) {
        this.eventManager.broadcast({ name: 'comentarCancionListModification', content: 'OK'});
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

    trackCancionById(index: number, item: Cancion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-comentar-cancion-popup',
    template: ''
})
export class ComentarCancionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comentarCancionPopupService: ComentarCancionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.comentarCancionPopupService
                    .open(ComentarCancionDialogComponent as Component, params['id']);
            } else {
                this.comentarCancionPopupService
                    .open(ComentarCancionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
