import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PuntuacionAlbum } from './puntuacion-album.model';
import { PuntuacionAlbumPopupService } from './puntuacion-album-popup.service';
import { PuntuacionAlbumService } from './puntuacion-album.service';

@Component({
    selector: 'jhi-puntuacion-album-delete-dialog',
    templateUrl: './puntuacion-album-delete-dialog.component.html'
})
export class PuntuacionAlbumDeleteDialogComponent {

    puntuacionAlbum: PuntuacionAlbum;

    constructor(
        private puntuacionAlbumService: PuntuacionAlbumService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.puntuacionAlbumService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'puntuacionAlbumListModification',
                content: 'Deleted an puntuacionAlbum'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-puntuacion-album-delete-popup',
    template: ''
})
export class PuntuacionAlbumDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private puntuacionAlbumPopupService: PuntuacionAlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.puntuacionAlbumPopupService
                .open(PuntuacionAlbumDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
