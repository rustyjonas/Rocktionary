import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ComentarBanda } from './comentar-banda.model';
import { ComentarBandaService } from './comentar-banda.service';

@Injectable()
export class ComentarBandaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private comentarBandaService: ComentarBandaService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.comentarBandaService.find(id)
                    .subscribe((comentarBandaResponse: HttpResponse<ComentarBanda>) => {
                        const comentarBanda: ComentarBanda = comentarBandaResponse.body;
                        comentarBanda.fechaComentario = this.datePipe
                            .transform(comentarBanda.fechaComentario, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.comentarBandaModalRef(component, comentarBanda);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.comentarBandaModalRef(component, new ComentarBanda());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    comentarBandaModalRef(component: Component, comentarBanda: ComentarBanda): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.comentarBanda = comentarBanda;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
