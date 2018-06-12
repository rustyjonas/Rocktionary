import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PuntuacionCancion } from './puntuacion-cancion.model';
import { PuntuacionCancionService } from './puntuacion-cancion.service';

@Component({
    selector: 'jhi-puntuacion-cancion-detail',
    templateUrl: './puntuacion-cancion-detail.component.html'
})
export class PuntuacionCancionDetailComponent implements OnInit, OnDestroy {

    puntuacionCancion: PuntuacionCancion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private puntuacionCancionService: PuntuacionCancionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPuntuacionCancions();
    }

    load(id) {
        this.puntuacionCancionService.find(id)
            .subscribe((puntuacionCancionResponse: HttpResponse<PuntuacionCancion>) => {
                this.puntuacionCancion = puntuacionCancionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPuntuacionCancions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'puntuacionCancionListModification',
            (response) => this.load(this.puntuacionCancion.id)
        );
    }
}
