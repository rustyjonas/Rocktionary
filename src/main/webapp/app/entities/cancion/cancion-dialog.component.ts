import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cancion } from './cancion.model';
import { CancionPopupService } from './cancion-popup.service';
import { CancionService } from './cancion.service';
import { Album, AlbumService } from '../album';

@Component({
    selector: 'jhi-cancion-dialog',
    templateUrl: './cancion-dialog.component.html'
})
export class CancionDialogComponent implements OnInit {

    cancion: Cancion;
    isSaving: boolean;

    albums: Album[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cancionService: CancionService,
        private albumService: AlbumService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.albumService.query()
            .subscribe((res: HttpResponse<Album[]>) => { this.albums = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cancion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cancionService.update(this.cancion));
        } else {
            this.subscribeToSaveResponse(
                this.cancionService.create(this.cancion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Cancion>>) {
        result.subscribe((res: HttpResponse<Cancion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Cancion) {
        this.eventManager.broadcast({ name: 'cancionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAlbumById(index: number, item: Album) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cancion-popup',
    template: ''
})
export class CancionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cancionPopupService: CancionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cancionPopupService
                    .open(CancionDialogComponent as Component, params['id']);
            } else {
                this.cancionPopupService
                    .open(CancionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
