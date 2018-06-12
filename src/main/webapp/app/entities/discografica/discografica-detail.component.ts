import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Discografica } from './discografica.model';
import { DiscograficaService } from './discografica.service';

@Component({
    selector: 'jhi-discografica-detail',
    templateUrl: './discografica-detail.component.html'
})
export class DiscograficaDetailComponent implements OnInit, OnDestroy {

    discografica: Discografica;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private discograficaService: DiscograficaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiscograficas();
    }

    load(id) {
        this.discograficaService.find(id)
            .subscribe((discograficaResponse: HttpResponse<Discografica>) => {
                this.discografica = discograficaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiscograficas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'discograficaListModification',
            (response) => this.load(this.discografica.id)
        );
    }
}
