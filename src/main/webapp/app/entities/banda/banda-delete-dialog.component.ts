import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Banda } from './banda.model';
import { BandaPopupService } from './banda-popup.service';
import { BandaService } from './banda.service';

@Component({
    selector: 'jhi-banda-delete-dialog',
    templateUrl: './banda-delete-dialog.component.html'
})
export class BandaDeleteDialogComponent {

    banda: Banda;

    constructor(
        private bandaService: BandaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bandaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bandaListModification',
                content: 'Deleted an banda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-banda-delete-popup',
    template: ''
})
export class BandaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bandaPopupService: BandaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bandaPopupService
                .open(BandaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
