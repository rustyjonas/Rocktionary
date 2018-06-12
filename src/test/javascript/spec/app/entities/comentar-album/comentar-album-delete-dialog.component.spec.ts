/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RocktionaryTestModule } from '../../../test.module';
import { ComentarAlbumDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/comentar-album/comentar-album-delete-dialog.component';
import { ComentarAlbumService } from '../../../../../../main/webapp/app/entities/comentar-album/comentar-album.service';

describe('Component Tests', () => {

    describe('ComentarAlbum Management Delete Component', () => {
        let comp: ComentarAlbumDeleteDialogComponent;
        let fixture: ComponentFixture<ComentarAlbumDeleteDialogComponent>;
        let service: ComentarAlbumService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComentarAlbumDeleteDialogComponent],
                providers: [
                    ComentarAlbumService
                ]
            })
            .overrideTemplate(ComentarAlbumDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarAlbumDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarAlbumService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
