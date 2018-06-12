import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComentarAlbum } from './comentar-album.model';
import { ComentarAlbumService } from './comentar-album.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-comentar-album',
    templateUrl: './comentar-album.component.html'
})
export class ComentarAlbumComponent implements OnInit, OnDestroy {
comentarAlbums: ComentarAlbum[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private comentarAlbumService: ComentarAlbumService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.comentarAlbumService.query().subscribe(
            (res: HttpResponse<ComentarAlbum[]>) => {
                this.comentarAlbums = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInComentarAlbums();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ComentarAlbum) {
        return item.id;
    }
    registerChangeInComentarAlbums() {
        this.eventSubscriber = this.eventManager.subscribe('comentarAlbumListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
