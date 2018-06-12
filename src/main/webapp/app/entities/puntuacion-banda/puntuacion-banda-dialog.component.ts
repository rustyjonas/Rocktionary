import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PuntuacionBanda } from './puntuacion-banda.model';
import { PuntuacionBandaPopupService } from './puntuacion-banda-popup.service';
import { PuntuacionBandaService } from './puntuacion-banda.service';
import { User, UserService } from '../../shared';
import { Banda, BandaService } from '../banda';

@Component({
    selector: 'jhi-puntuacion-banda-dialog',
    templateUrl: './puntuacion-banda-dialog.component.html'
})
export class PuntuacionBandaDialogComponent implements OnInit {

    puntuacionBanda: PuntuacionBanda;
    isSaving: boolean;

    users: User[];

    bandas: Banda[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private puntuacionBandaService: PuntuacionBandaService,
        private userService: UserService,
        private bandaService: BandaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.bandaService.query()
            .subscribe((res: HttpResponse<Banda[]>) => { this.bandas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.puntuacionBanda.id !== undefined) {
            this.subscribeToSaveResponse(
                this.puntuacionBandaService.update(this.puntuacionBanda));
        } else {
            this.subscribeToSaveResponse(
                this.puntuacionBandaService.create(this.puntuacionBanda));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PuntuacionBanda>>) {
        result.subscribe((res: HttpResponse<PuntuacionBanda>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PuntuacionBanda) {
        this.eventManager.broadcast({ name: 'puntuacionBandaListModification', content: 'OK'});
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

    trackBandaById(index: number, item: Banda) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-puntuacion-banda-popup',
    template: ''
})
export class PuntuacionBandaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private puntuacionBandaPopupService: PuntuacionBandaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.puntuacionBandaPopupService
                    .open(PuntuacionBandaDialogComponent as Component, params['id']);
            } else {
                this.puntuacionBandaPopupService
                    .open(PuntuacionBandaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
