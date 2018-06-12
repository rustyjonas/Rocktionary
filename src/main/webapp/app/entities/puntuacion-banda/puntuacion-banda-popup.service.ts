import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PuntuacionBanda } from './puntuacion-banda.model';
import { PuntuacionBandaService } from './puntuacion-banda.service';

@Injectable()
export class PuntuacionBandaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private puntuacionBandaService: PuntuacionBandaService

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
                this.puntuacionBandaService.find(id)
                    .subscribe((puntuacionBandaResponse: HttpResponse<PuntuacionBanda>) => {
                        const puntuacionBanda: PuntuacionBanda = puntuacionBandaResponse.body;
                        puntuacionBanda.fechaPuntuacion = this.datePipe
                            .transform(puntuacionBanda.fechaPuntuacion, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.puntuacionBandaModalRef(component, puntuacionBanda);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.puntuacionBandaModalRef(component, new PuntuacionBanda());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    puntuacionBandaModalRef(component: Component, puntuacionBanda: PuntuacionBanda): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.puntuacionBanda = puntuacionBanda;
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
