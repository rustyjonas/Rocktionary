import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComentarAlbum } from './comentar-album.model';
import { ComentarAlbumService } from './comentar-album.service';

@Component({
    selector: 'jhi-comentar-album-detail',
    templateUrl: './comentar-album-detail.component.html'
})
export class ComentarAlbumDetailComponent implements OnInit, OnDestroy {

    comentarAlbum: ComentarAlbum;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private comentarAlbumService: ComentarAlbumService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComentarAlbums();
    }

    load(id) {
        this.comentarAlbumService.find(id)
            .subscribe((comentarAlbumResponse: HttpResponse<ComentarAlbum>) => {
                this.comentarAlbum = comentarAlbumResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComentarAlbums() {
        this.eventSubscriber = this.eventManager.subscribe(
            'comentarAlbumListModification',
            (response) => this.load(this.comentarAlbum.id)
        );
    }
}
