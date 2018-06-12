import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComentarAlbum } from './comentar-album.model';
import { ComentarAlbumPopupService } from './comentar-album-popup.service';
import { ComentarAlbumService } from './comentar-album.service';

@Component({
    selector: 'jhi-comentar-album-delete-dialog',
    templateUrl: './comentar-album-delete-dialog.component.html'
})
export class ComentarAlbumDeleteDialogComponent {

    comentarAlbum: ComentarAlbum;

    constructor(
        private comentarAlbumService: ComentarAlbumService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.comentarAlbumService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'comentarAlbumListModification',
                content: 'Deleted an comentarAlbum'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comentar-album-delete-popup',
    template: ''
})
export class ComentarAlbumDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comentarAlbumPopupService: ComentarAlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.comentarAlbumPopupService
                .open(ComentarAlbumDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
