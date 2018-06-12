import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComentarAlbum } from './comentar-album.model';
import { ComentarAlbumPopupService } from './comentar-album-popup.service';
import { ComentarAlbumService } from './comentar-album.service';
import { User, UserService } from '../../shared';
import { Album, AlbumService } from '../album';

@Component({
    selector: 'jhi-comentar-album-dialog',
    templateUrl: './comentar-album-dialog.component.html'
})
export class ComentarAlbumDialogComponent implements OnInit {

    comentarAlbum: ComentarAlbum;
    isSaving: boolean;

    users: User[];

    albums: Album[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private comentarAlbumService: ComentarAlbumService,
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
        if (this.comentarAlbum.id !== undefined) {
            this.subscribeToSaveResponse(
                this.comentarAlbumService.update(this.comentarAlbum));
        } else {
            this.subscribeToSaveResponse(
                this.comentarAlbumService.create(this.comentarAlbum));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComentarAlbum>>) {
        result.subscribe((res: HttpResponse<ComentarAlbum>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComentarAlbum) {
        this.eventManager.broadcast({ name: 'comentarAlbumListModification', content: 'OK'});
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
    selector: 'jhi-comentar-album-popup',
    template: ''
})
export class ComentarAlbumPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comentarAlbumPopupService: ComentarAlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.comentarAlbumPopupService
                    .open(ComentarAlbumDialogComponent as Component, params['id']);
            } else {
                this.comentarAlbumPopupService
                    .open(ComentarAlbumDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
