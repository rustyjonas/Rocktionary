import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComentarBanda } from './comentar-banda.model';
import { ComentarBandaPopupService } from './comentar-banda-popup.service';
import { ComentarBandaService } from './comentar-banda.service';

@Component({
    selector: 'jhi-comentar-banda-delete-dialog',
    templateUrl: './comentar-banda-delete-dialog.component.html'
})
export class ComentarBandaDeleteDialogComponent {

    comentarBanda: ComentarBanda;

    constructor(
        private comentarBandaService: ComentarBandaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.comentarBandaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'comentarBandaListModification',
                content: 'Deleted an comentarBanda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comentar-banda-delete-popup',
    template: ''
})
export class ComentarBandaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comentarBandaPopupService: ComentarBandaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.comentarBandaPopupService
                .open(ComentarBandaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
