import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PuntuacionAlbum } from './puntuacion-album.model';
import { PuntuacionAlbumService } from './puntuacion-album.service';

@Injectable()
export class PuntuacionAlbumPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private puntuacionAlbumService: PuntuacionAlbumService

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
                this.puntuacionAlbumService.find(id)
                    .subscribe((puntuacionAlbumResponse: HttpResponse<PuntuacionAlbum>) => {
                        const puntuacionAlbum: PuntuacionAlbum = puntuacionAlbumResponse.body;
                        puntuacionAlbum.fechaPuntuacion = this.datePipe
                            .transform(puntuacionAlbum.fechaPuntuacion, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.puntuacionAlbumModalRef(component, puntuacionAlbum);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.puntuacionAlbumModalRef(component, new PuntuacionAlbum());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    puntuacionAlbumModalRef(component: Component, puntuacionAlbum: PuntuacionAlbum): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.puntuacionAlbum = puntuacionAlbum;
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
