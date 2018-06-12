import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Componente } from './componente.model';
import { ComponenteService } from './componente.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-componente',
    templateUrl: './componente.component.html'
})
export class ComponenteComponent implements OnInit, OnDestroy {
componentes: Componente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private componenteService: ComponenteService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.componenteService.query().subscribe(
            (res: HttpResponse<Componente[]>) => {
                this.componentes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInComponentes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Componente) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInComponentes() {
        this.eventSubscriber = this.eventManager.subscribe('componenteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
