import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Componente } from './componente.model';
import { ComponentePopupService } from './componente-popup.service';
import { ComponenteService } from './componente.service';

@Component({
    selector: 'jhi-componente-delete-dialog',
    templateUrl: './componente-delete-dialog.component.html'
})
export class ComponenteDeleteDialogComponent {

    componente: Componente;

    constructor(
        private componenteService: ComponenteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.componenteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'componenteListModification',
                content: 'Deleted an componente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-componente-delete-popup',
    template: ''
})
export class ComponenteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private componentePopupService: ComponentePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.componentePopupService
                .open(ComponenteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
