import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PuntuacionAlbum } from './puntuacion-album.model';
import { PuntuacionAlbumService } from './puntuacion-album.service';

@Component({
    selector: 'jhi-puntuacion-album-detail',
    templateUrl: './puntuacion-album-detail.component.html'
})
export class PuntuacionAlbumDetailComponent implements OnInit, OnDestroy {

    puntuacionAlbum: PuntuacionAlbum;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private puntuacionAlbumService: PuntuacionAlbumService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPuntuacionAlbums();
    }

    load(id) {
        this.puntuacionAlbumService.find(id)
            .subscribe((puntuacionAlbumResponse: HttpResponse<PuntuacionAlbum>) => {
                this.puntuacionAlbum = puntuacionAlbumResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPuntuacionAlbums() {
        this.eventSubscriber = this.eventManager.subscribe(
            'puntuacionAlbumListModification',
            (response) => this.load(this.puntuacionAlbum.id)
        );
    }
}
