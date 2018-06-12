import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Componente } from './componente.model';
import { ComponentePopupService } from './componente-popup.service';
import { ComponenteService } from './componente.service';
import { Banda, BandaService } from '../banda';

@Component({
    selector: 'jhi-componente-dialog',
    templateUrl: './componente-dialog.component.html'
})
export class ComponenteDialogComponent implements OnInit {

    componente: Componente;
    isSaving: boolean;

    bandas: Banda[];
    fechaEntradaDp: any;
    fechaSalidaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private componenteService: ComponenteService,
        private bandaService: BandaService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bandaService.query()
            .subscribe((res: HttpResponse<Banda[]>) => { this.bandas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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
        this.dataUtils.clearInputImage(this.componente, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.componente.id !== undefined) {
            this.subscribeToSaveResponse(
                this.componenteService.update(this.componente));
        } else {
            this.subscribeToSaveResponse(
                this.componenteService.create(this.componente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Componente>>) {
        result.subscribe((res: HttpResponse<Componente>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Componente) {
        this.eventManager.broadcast({ name: 'componenteListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-componente-popup',
    template: ''
})
export class ComponentePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private componentePopupService: ComponentePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.componentePopupService
                    .open(ComponenteDialogComponent as Component, params['id']);
            } else {
                this.componentePopupService
                    .open(ComponenteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
