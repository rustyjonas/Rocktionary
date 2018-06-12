import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Discografica } from './discografica.model';
import { DiscograficaService } from './discografica.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-discografica',
    templateUrl: './discografica.component.html'
})
export class DiscograficaComponent implements OnInit, OnDestroy {
discograficas: Discografica[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private discograficaService: DiscograficaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.discograficaService.query().subscribe(
            (res: HttpResponse<Discografica[]>) => {
                this.discograficas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDiscograficas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Discografica) {
        return item.id;
    }
    registerChangeInDiscograficas() {
        this.eventSubscriber = this.eventManager.subscribe('discograficaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
