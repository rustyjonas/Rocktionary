import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cancion } from './cancion.model';
import { CancionService } from './cancion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cancion',
    templateUrl: './cancion.component.html'
})
export class CancionComponent implements OnInit, OnDestroy {
cancions: Cancion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cancionService: CancionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cancionService.query().subscribe(
            (res: HttpResponse<Cancion[]>) => {
                this.cancions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCancions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Cancion) {
        return item.id;
    }
    registerChangeInCancions() {
        this.eventSubscriber = this.eventManager.subscribe('cancionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
