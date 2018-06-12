import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cancion } from './cancion.model';
import { CancionPopupService } from './cancion-popup.service';
import { CancionService } from './cancion.service';

@Component({
    selector: 'jhi-cancion-delete-dialog',
    templateUrl: './cancion-delete-dialog.component.html'
})
export class CancionDeleteDialogComponent {

    cancion: Cancion;

    constructor(
        private cancionService: CancionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cancionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cancionListModification',
                content: 'Deleted an cancion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cancion-delete-popup',
    template: ''
})
export class CancionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cancionPopupService: CancionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cancionPopupService
                .open(CancionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
