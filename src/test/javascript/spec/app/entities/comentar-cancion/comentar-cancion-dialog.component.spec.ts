/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RocktionaryTestModule } from '../../../test.module';
import { ComentarCancionDialogComponent } from '../../../../../../main/webapp/app/entities/comentar-cancion/comentar-cancion-dialog.component';
import { ComentarCancionService } from '../../../../../../main/webapp/app/entities/comentar-cancion/comentar-cancion.service';
import { ComentarCancion } from '../../../../../../main/webapp/app/entities/comentar-cancion/comentar-cancion.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { CancionService } from '../../../../../../main/webapp/app/entities/cancion';

describe('Component Tests', () => {

    describe('ComentarCancion Management Dialog Component', () => {
        let comp: ComentarCancionDialogComponent;
        let fixture: ComponentFixture<ComentarCancionDialogComponent>;
        let service: ComentarCancionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComentarCancionDialogComponent],
                providers: [
                    UserService,
                    CancionService,
                    ComentarCancionService
                ]
            })
            .overrideTemplate(ComentarCancionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarCancionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarCancionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComentarCancion(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comentarCancion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'comentarCancionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComentarCancion();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comentarCancion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'comentarCancionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
