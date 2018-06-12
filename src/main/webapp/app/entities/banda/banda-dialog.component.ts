import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Banda } from './banda.model';
import { BandaPopupService } from './banda-popup.service';
import { BandaService } from './banda.service';
import { Discografica, DiscograficaService } from '../discografica';

@Component({
    selector: 'jhi-banda-dialog',
    templateUrl: './banda-dialog.component.html'
})
export class BandaDialogComponent implements OnInit {

    banda: Banda;
    isSaving: boolean;

    discograficas: Discografica[];
    datacreacionDp: any;
    anosactivoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private bandaService: BandaService,
        private discograficaService: DiscograficaService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.discograficaService.query()
            .subscribe((res: HttpResponse<Discografica[]>) => { this.discograficas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.banda, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.banda.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bandaService.update(this.banda));
        } else {
            this.subscribeToSaveResponse(
                this.bandaService.create(this.banda));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Banda>>) {
        result.subscribe((res: HttpResponse<Banda>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Banda) {
        this.eventManager.broadcast({ name: 'bandaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDiscograficaById(index: number, item: Discografica) {
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
    selector: 'jhi-banda-popup',
    template: ''
})
export class BandaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bandaPopupService: BandaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bandaPopupService
                    .open(BandaDialogComponent as Component, params['id']);
            } else {
                this.bandaPopupService
                    .open(BandaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
