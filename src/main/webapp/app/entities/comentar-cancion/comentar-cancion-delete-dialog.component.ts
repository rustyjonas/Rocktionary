import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComentarCancion } from './comentar-cancion.model';
import { ComentarCancionPopupService } from './comentar-cancion-popup.service';
import { ComentarCancionService } from './comentar-cancion.service';

@Component({
    selector: 'jhi-comentar-cancion-delete-dialog',
    templateUrl: './comentar-cancion-delete-dialog.component.html'
})
export class ComentarCancionDeleteDialogComponent {

    comentarCancion: ComentarCancion;

    constructor(
        private comentarCancionService: ComentarCancionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.comentarCancionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'comentarCancionListModification',
                content: 'Deleted an comentarCancion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comentar-cancion-delete-popup',
    template: ''
})
export class ComentarCancionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comentarCancionPopupService: ComentarCancionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.comentarCancionPopupService
                .open(ComentarCancionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
