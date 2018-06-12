import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Prueba } from './prueba.model';
import { PruebaService } from './prueba.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-prueba',
    templateUrl: './prueba.component.html'
})
export class PruebaComponent implements OnInit, OnDestroy {
pruebas: Prueba[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pruebaService: PruebaService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pruebaService.query().subscribe(
            (res: HttpResponse<Prueba[]>) => {
                this.pruebas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPruebas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Prueba) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInPruebas() {
        this.eventSubscriber = this.eventManager.subscribe('pruebaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
