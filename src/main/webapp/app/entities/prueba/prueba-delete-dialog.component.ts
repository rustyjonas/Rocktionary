import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Prueba } from './prueba.model';
import { PruebaPopupService } from './prueba-popup.service';
import { PruebaService } from './prueba.service';

@Component({
    selector: 'jhi-prueba-delete-dialog',
    templateUrl: './prueba-delete-dialog.component.html'
})
export class PruebaDeleteDialogComponent {

    prueba: Prueba;

    constructor(
        private pruebaService: PruebaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pruebaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pruebaListModification',
                content: 'Deleted an prueba'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prueba-delete-popup',
    template: ''
})
export class PruebaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pruebaPopupService: PruebaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pruebaPopupService
                .open(PruebaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
