import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComentarBanda } from './comentar-banda.model';
import { ComentarBandaService } from './comentar-banda.service';

@Component({
    selector: 'jhi-comentar-banda-detail',
    templateUrl: './comentar-banda-detail.component.html'
})
export class ComentarBandaDetailComponent implements OnInit, OnDestroy {

    comentarBanda: ComentarBanda;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private comentarBandaService: ComentarBandaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComentarBandas();
    }

    load(id) {
        this.comentarBandaService.find(id)
            .subscribe((comentarBandaResponse: HttpResponse<ComentarBanda>) => {
                this.comentarBanda = comentarBandaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComentarBandas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'comentarBandaListModification',
            (response) => this.load(this.comentarBanda.id)
        );
    }
}
