import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PuntuacionCancion } from './puntuacion-cancion.model';
import { PuntuacionCancionService } from './puntuacion-cancion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-puntuacion-cancion',
    templateUrl: './puntuacion-cancion.component.html'
})
export class PuntuacionCancionComponent implements OnInit, OnDestroy {
puntuacionCancions: PuntuacionCancion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private puntuacionCancionService: PuntuacionCancionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.puntuacionCancionService.query().subscribe(
            (res: HttpResponse<PuntuacionCancion[]>) => {
                this.puntuacionCancions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPuntuacionCancions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PuntuacionCancion) {
        return item.id;
    }
    registerChangeInPuntuacionCancions() {
        this.eventSubscriber = this.eventManager.subscribe('puntuacionCancionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
