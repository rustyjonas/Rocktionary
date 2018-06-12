import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComentarCancion } from './comentar-cancion.model';
import { ComentarCancionService } from './comentar-cancion.service';

@Component({
    selector: 'jhi-comentar-cancion-detail',
    templateUrl: './comentar-cancion-detail.component.html'
})
export class ComentarCancionDetailComponent implements OnInit, OnDestroy {

    comentarCancion: ComentarCancion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private comentarCancionService: ComentarCancionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComentarCancions();
    }

    load(id) {
        this.comentarCancionService.find(id)
            .subscribe((comentarCancionResponse: HttpResponse<ComentarCancion>) => {
                this.comentarCancion = comentarCancionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComentarCancions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'comentarCancionListModification',
            (response) => this.load(this.comentarCancion.id)
        );
    }
}
