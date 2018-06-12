import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComentarBanda } from './comentar-banda.model';
import { ComentarBandaService } from './comentar-banda.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-comentar-banda',
    templateUrl: './comentar-banda.component.html'
})
export class ComentarBandaComponent implements OnInit, OnDestroy {
comentarBandas: ComentarBanda[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private comentarBandaService: ComentarBandaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.comentarBandaService.query().subscribe(
            (res: HttpResponse<ComentarBanda[]>) => {
                this.comentarBandas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInComentarBandas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ComentarBanda) {
        return item.id;
    }
    registerChangeInComentarBandas() {
        this.eventSubscriber = this.eventManager.subscribe('comentarBandaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
