import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Discografica } from './discografica.model';
import { DiscograficaPopupService } from './discografica-popup.service';
import { DiscograficaService } from './discografica.service';
import { Banda, BandaService } from '../banda';

@Component({
    selector: 'jhi-discografica-dialog',
    templateUrl: './discografica-dialog.component.html'
})
export class DiscograficaDialogComponent implements OnInit {

    discografica: Discografica;
    isSaving: boolean;

    bandas: Banda[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private discograficaService: DiscograficaService,
        private bandaService: BandaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bandaService.query()
            .subscribe((res: HttpResponse<Banda[]>) => { this.bandas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.discografica.id !== undefined) {
            this.subscribeToSaveResponse(
                this.discograficaService.update(this.discografica));
        } else {
            this.subscribeToSaveResponse(
                this.discograficaService.create(this.discografica));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Discografica>>) {
        result.subscribe((res: HttpResponse<Discografica>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Discografica) {
        this.eventManager.broadcast({ name: 'discograficaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBandaById(index: number, item: Banda) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-discografica-popup',
    template: ''
})
export class DiscograficaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discograficaPopupService: DiscograficaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.discograficaPopupService
                    .open(DiscograficaDialogComponent as Component, params['id']);
            } else {
                this.discograficaPopupService
                    .open(DiscograficaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
