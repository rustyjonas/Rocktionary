import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PuntuacionCancion } from './puntuacion-cancion.model';
import { PuntuacionCancionPopupService } from './puntuacion-cancion-popup.service';
import { PuntuacionCancionService } from './puntuacion-cancion.service';

@Component({
    selector: 'jhi-puntuacion-cancion-delete-dialog',
    templateUrl: './puntuacion-cancion-delete-dialog.component.html'
})
export class PuntuacionCancionDeleteDialogComponent {

    puntuacionCancion: PuntuacionCancion;

    constructor(
        private puntuacionCancionService: PuntuacionCancionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.puntuacionCancionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'puntuacionCancionListModification',
                content: 'Deleted an puntuacionCancion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-puntuacion-cancion-delete-popup',
    template: ''
})
export class PuntuacionCancionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private puntuacionCancionPopupService: PuntuacionCancionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.puntuacionCancionPopupService
                .open(PuntuacionCancionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
