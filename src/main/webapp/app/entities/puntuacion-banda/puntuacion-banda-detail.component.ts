import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PuntuacionBanda } from './puntuacion-banda.model';
import { PuntuacionBandaService } from './puntuacion-banda.service';

@Component({
    selector: 'jhi-puntuacion-banda-detail',
    templateUrl: './puntuacion-banda-detail.component.html'
})
export class PuntuacionBandaDetailComponent implements OnInit, OnDestroy {

    puntuacionBanda: PuntuacionBanda;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private puntuacionBandaService: PuntuacionBandaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPuntuacionBandas();
    }

    load(id) {
        this.puntuacionBandaService.find(id)
            .subscribe((puntuacionBandaResponse: HttpResponse<PuntuacionBanda>) => {
                this.puntuacionBanda = puntuacionBandaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPuntuacionBandas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'puntuacionBandaListModification',
            (response) => this.load(this.puntuacionBanda.id)
        );
    }
}
