import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PuntuacionAlbum } from './puntuacion-album.model';
import { PuntuacionAlbumService } from './puntuacion-album.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-puntuacion-album',
    templateUrl: './puntuacion-album.component.html'
})
export class PuntuacionAlbumComponent implements OnInit, OnDestroy {
puntuacionAlbums: PuntuacionAlbum[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private puntuacionAlbumService: PuntuacionAlbumService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.puntuacionAlbumService.query().subscribe(
            (res: HttpResponse<PuntuacionAlbum[]>) => {
                this.puntuacionAlbums = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPuntuacionAlbums();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PuntuacionAlbum) {
        return item.id;
    }
    registerChangeInPuntuacionAlbums() {
        this.eventSubscriber = this.eventManager.subscribe('puntuacionAlbumListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
