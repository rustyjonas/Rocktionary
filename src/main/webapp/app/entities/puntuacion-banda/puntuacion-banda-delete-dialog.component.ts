import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PuntuacionBanda } from './puntuacion-banda.model';
import { PuntuacionBandaPopupService } from './puntuacion-banda-popup.service';
import { PuntuacionBandaService } from './puntuacion-banda.service';

@Component({
    selector: 'jhi-puntuacion-banda-delete-dialog',
    templateUrl: './puntuacion-banda-delete-dialog.component.html'
})
export class PuntuacionBandaDeleteDialogComponent {

    puntuacionBanda: PuntuacionBanda;

    constructor(
        private puntuacionBandaService: PuntuacionBandaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.puntuacionBandaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'puntuacionBandaListModification',
                content: 'Deleted an puntuacionBanda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-puntuacion-banda-delete-popup',
    template: ''
})
export class PuntuacionBandaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private puntuacionBandaPopupService: PuntuacionBandaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.puntuacionBandaPopupService
                .open(PuntuacionBandaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
