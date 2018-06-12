import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Prueba } from './prueba.model';
import { PruebaService } from './prueba.service';

@Component({
    selector: 'jhi-prueba-detail',
    templateUrl: './prueba-detail.component.html'
})
export class PruebaDetailComponent implements OnInit, OnDestroy {

    prueba: Prueba;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private pruebaService: PruebaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPruebas();
    }

    load(id) {
        this.pruebaService.find(id)
            .subscribe((pruebaResponse: HttpResponse<Prueba>) => {
                this.prueba = pruebaResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPruebas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pruebaListModification',
            (response) => this.load(this.prueba.id)
        );
    }
}
