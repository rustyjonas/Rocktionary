import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ComentarCancion } from './comentar-cancion.model';
import { ComentarCancionService } from './comentar-cancion.service';

@Injectable()
export class ComentarCancionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private comentarCancionService: ComentarCancionService

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
                this.comentarCancionService.find(id)
                    .subscribe((comentarCancionResponse: HttpResponse<ComentarCancion>) => {
                        const comentarCancion: ComentarCancion = comentarCancionResponse.body;
                        comentarCancion.fechaComentario = this.datePipe
                            .transform(comentarCancion.fechaComentario, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.comentarCancionModalRef(component, comentarCancion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.comentarCancionModalRef(component, new ComentarCancion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    comentarCancionModalRef(component: Component, comentarCancion: ComentarCancion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.comentarCancion = comentarCancion;
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
