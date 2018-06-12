import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComentarCancion } from './comentar-cancion.model';
import { ComentarCancionService } from './comentar-cancion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-comentar-cancion',
    templateUrl: './comentar-cancion.component.html'
})
export class ComentarCancionComponent implements OnInit, OnDestroy {
comentarCancions: ComentarCancion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private comentarCancionService: ComentarCancionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.comentarCancionService.query().subscribe(
            (res: HttpResponse<ComentarCancion[]>) => {
                this.comentarCancions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInComentarCancions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ComentarCancion) {
        return item.id;
    }
    registerChangeInComentarCancions() {
        this.eventSubscriber = this.eventManager.subscribe('comentarCancionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
