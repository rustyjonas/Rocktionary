import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComentarBanda } from './comentar-banda.model';
import { ComentarBandaPopupService } from './comentar-banda-popup.service';
import { ComentarBandaService } from './comentar-banda.service';
import { User, UserService } from '../../shared';
import { Banda, BandaService } from '../banda';

@Component({
    selector: 'jhi-comentar-banda-dialog',
    templateUrl: './comentar-banda-dialog.component.html'
})
export class ComentarBandaDialogComponent implements OnInit {

    comentarBanda: ComentarBanda;
    isSaving: boolean;

    users: User[];

    bandas: Banda[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private comentarBandaService: ComentarBandaService,
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
        if (this.comentarBanda.id !== undefined) {
            this.subscribeToSaveResponse(
                this.comentarBandaService.update(this.comentarBanda));
        } else {
            this.subscribeToSaveResponse(
                this.comentarBandaService.create(this.comentarBanda));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComentarBanda>>) {
        result.subscribe((res: HttpResponse<ComentarBanda>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComentarBanda) {
        this.eventManager.broadcast({ name: 'comentarBandaListModification', content: 'OK'});
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
    selector: 'jhi-comentar-banda-popup',
    template: ''
})
export class ComentarBandaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comentarBandaPopupService: ComentarBandaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.comentarBandaPopupService
                    .open(ComentarBandaDialogComponent as Component, params['id']);
            } else {
                this.comentarBandaPopupService
                    .open(ComentarBandaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
