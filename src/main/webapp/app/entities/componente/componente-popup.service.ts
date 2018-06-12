import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Componente } from './componente.model';
import { ComponenteService } from './componente.service';

@Injectable()
export class ComponentePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private componenteService: ComponenteService

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
                this.componenteService.find(id)
                    .subscribe((componenteResponse: HttpResponse<Componente>) => {
                        const componente: Componente = componenteResponse.body;
                        if (componente.fechaEntrada) {
                            componente.fechaEntrada = {
                                year: componente.fechaEntrada.getFullYear(),
                                month: componente.fechaEntrada.getMonth() + 1,
                                day: componente.fechaEntrada.getDate()
                            };
                        }
                        if (componente.fechaSalida) {
                            componente.fechaSalida = {
                                year: componente.fechaSalida.getFullYear(),
                                month: componente.fechaSalida.getMonth() + 1,
                                day: componente.fechaSalida.getDate()
                            };
                        }
                        this.ngbModalRef = this.componenteModalRef(component, componente);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.componenteModalRef(component, new Componente());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    componenteModalRef(component: Component, componente: Componente): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.componente = componente;
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
