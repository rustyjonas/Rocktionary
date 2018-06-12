import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PuntuacionAlbum } from './puntuacion-album.model';
import { PuntuacionAlbumPopupService } from './puntuacion-album-popup.service';
import { PuntuacionAlbumService } from './puntuacion-album.service';
import { User, UserService } from '../../shared';
import { Album, AlbumService } from '../album';

@Component({
    selector: 'jhi-puntuacion-album-dialog',
    templateUrl: './puntuacion-album-dialog.component.html'
})
export class PuntuacionAlbumDialogComponent implements OnInit {

    puntuacionAlbum: PuntuacionAlbum;
    isSaving: boolean;

    users: User[];

    albums: Album[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private puntuacionAlbumService: PuntuacionAlbumService,
        private userService: UserService,
        private albumService: AlbumService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.albumService.query()
            .subscribe((res: HttpResponse<Album[]>) => { this.albums = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.puntuacionAlbum.id !== undefined) {
            this.subscribeToSaveResponse(
                this.puntuacionAlbumService.update(this.puntuacionAlbum));
        } else {
            this.subscribeToSaveResponse(
                this.puntuacionAlbumService.create(this.puntuacionAlbum));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PuntuacionAlbum>>) {
        result.subscribe((res: HttpResponse<PuntuacionAlbum>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PuntuacionAlbum) {
        this.eventManager.broadcast({ name: 'puntuacionAlbumListModification', content: 'OK'});
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

    trackAlbumById(index: number, item: Album) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-puntuacion-album-popup',
    template: ''
})
export class PuntuacionAlbumPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private puntuacionAlbumPopupService: PuntuacionAlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.puntuacionAlbumPopupService
                    .open(PuntuacionAlbumDialogComponent as Component, params['id']);
            } else {
                this.puntuacionAlbumPopupService
                    .open(PuntuacionAlbumDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
