/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RocktionaryTestModule } from '../../../test.module';
import { PuntuacionAlbumDialogComponent } from '../../../../../../main/webapp/app/entities/puntuacion-album/puntuacion-album-dialog.component';
import { PuntuacionAlbumService } from '../../../../../../main/webapp/app/entities/puntuacion-album/puntuacion-album.service';
import { PuntuacionAlbum } from '../../../../../../main/webapp/app/entities/puntuacion-album/puntuacion-album.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { AlbumService } from '../../../../../../main/webapp/app/entities/album';

describe('Component Tests', () => {

    describe('PuntuacionAlbum Management Dialog Component', () => {
        let comp: PuntuacionAlbumDialogComponent;
        let fixture: ComponentFixture<PuntuacionAlbumDialogComponent>;
        let service: PuntuacionAlbumService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [PuntuacionAlbumDialogComponent],
                providers: [
                    UserService,
                    AlbumService,
                    PuntuacionAlbumService
                ]
            })
            .overrideTemplate(PuntuacionAlbumDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PuntuacionAlbumDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuntuacionAlbumService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PuntuacionAlbum(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.puntuacionAlbum = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'puntuacionAlbumListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PuntuacionAlbum();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.puntuacionAlbum = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'puntuacionAlbumListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
