import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Banda } from './banda.model';
import { BandaService } from './banda.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-banda',
    templateUrl: './banda.component.html'
})
export class BandaComponent implements OnInit, OnDestroy {
bandas: Banda[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bandaService: BandaService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bandaService.query().subscribe(
            (res: HttpResponse<Banda[]>) => {
                this.bandas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBandas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Banda) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInBandas() {
        this.eventSubscriber = this.eventManager.subscribe('bandaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
