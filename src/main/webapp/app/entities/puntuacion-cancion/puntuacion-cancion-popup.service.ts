import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PuntuacionCancion } from './puntuacion-cancion.model';
import { PuntuacionCancionService } from './puntuacion-cancion.service';

@Injectable()
export class PuntuacionCancionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private puntuacionCancionService: PuntuacionCancionService

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
                this.puntuacionCancionService.find(id)
                    .subscribe((puntuacionCancionResponse: HttpResponse<PuntuacionCancion>) => {
                        const puntuacionCancion: PuntuacionCancion = puntuacionCancionResponse.body;
                        puntuacionCancion.fechaPuntuacion = this.datePipe
                            .transform(puntuacionCancion.fechaPuntuacion, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.puntuacionCancionModalRef(component, puntuacionCancion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.puntuacionCancionModalRef(component, new PuntuacionCancion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    puntuacionCancionModalRef(component: Component, puntuacionCancion: PuntuacionCancion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.puntuacionCancion = puntuacionCancion;
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
