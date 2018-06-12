import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PuntuacionCancion } from './puntuacion-cancion.model';
import { PuntuacionCancionPopupService } from './puntuacion-cancion-popup.service';
import { PuntuacionCancionService } from './puntuacion-cancion.service';
import { User, UserService } from '../../shared';
import { Cancion, CancionService } from '../cancion';

@Component({
    selector: 'jhi-puntuacion-cancion-dialog',
    templateUrl: './puntuacion-cancion-dialog.component.html'
})
export class PuntuacionCancionDialogComponent implements OnInit {

    puntuacionCancion: PuntuacionCancion;
    isSaving: boolean;

    users: User[];

    cancions: Cancion[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private puntuacionCancionService: PuntuacionCancionService,
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
        if (this.puntuacionCancion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.puntuacionCancionService.update(this.puntuacionCancion));
        } else {
            this.subscribeToSaveResponse(
                this.puntuacionCancionService.create(this.puntuacionCancion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PuntuacionCancion>>) {
        result.subscribe((res: HttpResponse<PuntuacionCancion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PuntuacionCancion) {
        this.eventManager.broadcast({ name: 'puntuacionCancionListModification', content: 'OK'});
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
    selector: 'jhi-puntuacion-cancion-popup',
    template: ''
})
export class PuntuacionCancionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private puntuacionCancionPopupService: PuntuacionCancionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.puntuacionCancionPopupService
                    .open(PuntuacionCancionDialogComponent as Component, params['id']);
            } else {
                this.puntuacionCancionPopupService
                    .open(PuntuacionCancionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
