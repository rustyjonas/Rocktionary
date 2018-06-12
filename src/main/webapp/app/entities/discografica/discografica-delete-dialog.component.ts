import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Discografica } from './discografica.model';
import { DiscograficaPopupService } from './discografica-popup.service';
import { DiscograficaService } from './discografica.service';

@Component({
    selector: 'jhi-discografica-delete-dialog',
    templateUrl: './discografica-delete-dialog.component.html'
})
export class DiscograficaDeleteDialogComponent {

    discografica: Discografica;

    constructor(
        private discograficaService: DiscograficaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.discograficaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'discograficaListModification',
                content: 'Deleted an discografica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discografica-delete-popup',
    template: ''
})
export class DiscograficaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discograficaPopupService: DiscograficaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.discograficaPopupService
                .open(DiscograficaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
