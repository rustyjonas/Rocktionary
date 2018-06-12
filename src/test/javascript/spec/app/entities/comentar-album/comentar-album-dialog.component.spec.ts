/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RocktionaryTestModule } from '../../../test.module';
import { ComentarAlbumDialogComponent } from '../../../../../../main/webapp/app/entities/comentar-album/comentar-album-dialog.component';
import { ComentarAlbumService } from '../../../../../../main/webapp/app/entities/comentar-album/comentar-album.service';
import { ComentarAlbum } from '../../../../../../main/webapp/app/entities/comentar-album/comentar-album.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { AlbumService } from '../../../../../../main/webapp/app/entities/album';

describe('Component Tests', () => {

    describe('ComentarAlbum Management Dialog Component', () => {
        let comp: ComentarAlbumDialogComponent;
        let fixture: ComponentFixture<ComentarAlbumDialogComponent>;
        let service: ComentarAlbumService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComentarAlbumDialogComponent],
                providers: [
                    UserService,
                    AlbumService,
                    ComentarAlbumService
                ]
            })
            .overrideTemplate(ComentarAlbumDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarAlbumDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarAlbumService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComentarAlbum(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comentarAlbum = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'comentarAlbumListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComentarAlbum();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comentarAlbum = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'comentarAlbumListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
