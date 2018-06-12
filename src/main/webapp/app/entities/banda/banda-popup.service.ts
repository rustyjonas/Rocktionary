import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Banda } from './banda.model';
import { BandaService } from './banda.service';

@Injectable()
export class BandaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private bandaService: BandaService

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
                this.bandaService.find(id)
                    .subscribe((bandaResponse: HttpResponse<Banda>) => {
                        const banda: Banda = bandaResponse.body;
                        if (banda.datacreacion) {
                            banda.datacreacion = {
                                year: banda.datacreacion.getFullYear(),
                                month: banda.datacreacion.getMonth() + 1,
                                day: banda.datacreacion.getDate()
                            };
                        }
                        if (banda.anosactivo) {
                            banda.anosactivo = {
                                year: banda.anosactivo.getFullYear(),
                                month: banda.anosactivo.getMonth() + 1,
                                day: banda.anosactivo.getDate()
                            };
                        }
                        this.ngbModalRef = this.bandaModalRef(component, banda);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.bandaModalRef(component, new Banda());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bandaModalRef(component: Component, banda: Banda): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.banda = banda;
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
