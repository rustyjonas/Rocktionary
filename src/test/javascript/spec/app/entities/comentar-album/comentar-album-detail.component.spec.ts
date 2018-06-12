/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RocktionaryTestModule } from '../../../test.module';
import { ComentarAlbumDetailComponent } from '../../../../../../main/webapp/app/entities/comentar-album/comentar-album-detail.component';
import { ComentarAlbumService } from '../../../../../../main/webapp/app/entities/comentar-album/comentar-album.service';
import { ComentarAlbum } from '../../../../../../main/webapp/app/entities/comentar-album/comentar-album.model';

describe('Component Tests', () => {

    describe('ComentarAlbum Management Detail Component', () => {
        let comp: ComentarAlbumDetailComponent;
        let fixture: ComponentFixture<ComentarAlbumDetailComponent>;
        let service: ComentarAlbumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComentarAlbumDetailComponent],
                providers: [
                    ComentarAlbumService
                ]
            })
            .overrideTemplate(ComentarAlbumDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarAlbumDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarAlbumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComentarAlbum(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.comentarAlbum).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
