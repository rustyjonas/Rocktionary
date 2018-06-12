import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Prueba } from './prueba.model';
import { PruebaPopupService } from './prueba-popup.service';
import { PruebaService } from './prueba.service';

@Component({
    selector: 'jhi-prueba-dialog',
    templateUrl: './prueba-dialog.component.html'
})
export class PruebaDialogComponent implements OnInit {

    prueba: Prueba;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private pruebaService: PruebaService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        this.dataUtils.clearInputImage(this.prueba, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.prueba.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pruebaService.update(this.prueba));
        } else {
            this.subscribeToSaveResponse(
                this.pruebaService.create(this.prueba));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Prueba>>) {
        result.subscribe((res: HttpResponse<Prueba>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Prueba) {
        this.eventManager.broadcast({ name: 'pruebaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-prueba-popup',
    template: ''
})
export class PruebaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pruebaPopupService: PruebaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pruebaPopupService
                    .open(PruebaDialogComponent as Component, params['id']);
            } else {
                this.pruebaPopupService
                    .open(PruebaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
