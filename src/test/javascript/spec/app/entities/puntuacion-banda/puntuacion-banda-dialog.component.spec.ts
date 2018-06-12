/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RocktionaryTestModule } from '../../../test.module';
import { PuntuacionBandaDialogComponent } from '../../../../../../main/webapp/app/entities/puntuacion-banda/puntuacion-banda-dialog.component';
import { PuntuacionBandaService } from '../../../../../../main/webapp/app/entities/puntuacion-banda/puntuacion-banda.service';
import { PuntuacionBanda } from '../../../../../../main/webapp/app/entities/puntuacion-banda/puntuacion-banda.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { BandaService } from '../../../../../../main/webapp/app/entities/banda';

describe('Component Tests', () => {

    describe('PuntuacionBanda Management Dialog Component', () => {
        let comp: PuntuacionBandaDialogComponent;
        let fixture: ComponentFixture<PuntuacionBandaDialogComponent>;
        let service: PuntuacionBandaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [PuntuacionBandaDialogComponent],
                providers: [
                    UserService,
                    BandaService,
                    PuntuacionBandaService
                ]
            })
            .overrideTemplate(PuntuacionBandaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PuntuacionBandaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuntuacionBandaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PuntuacionBanda(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.puntuacionBanda = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'puntuacionBandaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PuntuacionBanda();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.puntuacionBanda = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'puntuacionBandaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
