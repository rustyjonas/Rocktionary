/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RocktionaryTestModule } from '../../../test.module';
import { ComentarBandaDialogComponent } from '../../../../../../main/webapp/app/entities/comentar-banda/comentar-banda-dialog.component';
import { ComentarBandaService } from '../../../../../../main/webapp/app/entities/comentar-banda/comentar-banda.service';
import { ComentarBanda } from '../../../../../../main/webapp/app/entities/comentar-banda/comentar-banda.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { BandaService } from '../../../../../../main/webapp/app/entities/banda';

describe('Component Tests', () => {

    describe('ComentarBanda Management Dialog Component', () => {
        let comp: ComentarBandaDialogComponent;
        let fixture: ComponentFixture<ComentarBandaDialogComponent>;
        let service: ComentarBandaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComentarBandaDialogComponent],
                providers: [
                    UserService,
                    BandaService,
                    ComentarBandaService
                ]
            })
            .overrideTemplate(ComentarBandaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarBandaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarBandaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComentarBanda(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comentarBanda = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'comentarBandaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComentarBanda();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comentarBanda = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'comentarBandaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
