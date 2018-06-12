import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Componente } from './componente.model';
import { ComponenteService } from './componente.service';

@Component({
    selector: 'jhi-componente-detail',
    templateUrl: './componente-detail.component.html'
})
export class ComponenteDetailComponent implements OnInit, OnDestroy {

    componente: Componente;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private componenteService: ComponenteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComponentes();
    }

    load(id) {
        this.componenteService.find(id)
            .subscribe((componenteResponse: HttpResponse<Componente>) => {
                this.componente = componenteResponse.body;
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

    registerChangeInComponentes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'componenteListModification',
            (response) => this.load(this.componente.id)
        );
    }
}
