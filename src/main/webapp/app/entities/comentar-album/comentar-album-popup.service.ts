import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ComentarAlbum } from './comentar-album.model';
import { ComentarAlbumService } from './comentar-album.service';

@Injectable()
export class ComentarAlbumPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private comentarAlbumService: ComentarAlbumService

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
                this.comentarAlbumService.find(id)
                    .subscribe((comentarAlbumResponse: HttpResponse<ComentarAlbum>) => {
                        const comentarAlbum: ComentarAlbum = comentarAlbumResponse.body;
                        comentarAlbum.fechaComentario = this.datePipe
                            .transform(comentarAlbum.fechaComentario, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.comentarAlbumModalRef(component, comentarAlbum);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.comentarAlbumModalRef(component, new ComentarAlbum());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    comentarAlbumModalRef(component: Component, comentarAlbum: ComentarAlbum): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.comentarAlbum = comentarAlbum;
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
