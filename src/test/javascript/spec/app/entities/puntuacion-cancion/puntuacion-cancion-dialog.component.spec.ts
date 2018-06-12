/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RocktionaryTestModule } from '../../../test.module';
import { PuntuacionCancionDialogComponent } from '../../../../../../main/webapp/app/entities/puntuacion-cancion/puntuacion-cancion-dialog.component';
import { PuntuacionCancionService } from '../../../../../../main/webapp/app/entities/puntuacion-cancion/puntuacion-cancion.service';
import { PuntuacionCancion } from '../../../../../../main/webapp/app/entities/puntuacion-cancion/puntuacion-cancion.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { CancionService } from '../../../../../../main/webapp/app/entities/cancion';

describe('Component Tests', () => {

    describe('PuntuacionCancion Management Dialog Component', () => {
        let comp: PuntuacionCancionDialogComponent;
        let fixture: ComponentFixture<PuntuacionCancionDialogComponent>;
        let service: PuntuacionCancionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [PuntuacionCancionDialogComponent],
                providers: [
                    UserService,
                    CancionService,
                    PuntuacionCancionService
                ]
            })
            .overrideTemplate(PuntuacionCancionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PuntuacionCancionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuntuacionCancionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PuntuacionCancion(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.puntuacionCancion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'puntuacionCancionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PuntuacionCancion();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.puntuacionCancion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'puntuacionCancionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
