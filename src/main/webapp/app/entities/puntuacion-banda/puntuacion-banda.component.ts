import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PuntuacionBanda } from './puntuacion-banda.model';
import { PuntuacionBandaService } from './puntuacion-banda.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-puntuacion-banda',
    templateUrl: './puntuacion-banda.component.html'
})
export class PuntuacionBandaComponent implements OnInit, OnDestroy {
puntuacionBandas: PuntuacionBanda[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private puntuacionBandaService: PuntuacionBandaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.puntuacionBandaService.query().subscribe(
            (res: HttpResponse<PuntuacionBanda[]>) => {
                this.puntuacionBandas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPuntuacionBandas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PuntuacionBanda) {
        return item.id;
    }
    registerChangeInPuntuacionBandas() {
        this.eventSubscriber = this.eventManager.subscribe('puntuacionBandaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
