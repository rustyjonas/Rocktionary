/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { ComentarAlbumComponent } from '../../../../../../main/webapp/app/entities/comentar-album/comentar-album.component';
import { ComentarAlbumService } from '../../../../../../main/webapp/app/entities/comentar-album/comentar-album.service';
import { ComentarAlbum } from '../../../../../../main/webapp/app/entities/comentar-album/comentar-album.model';

describe('Component Tests', () => {

    describe('ComentarAlbum Management Component', () => {
        let comp: ComentarAlbumComponent;
        let fixture: ComponentFixture<ComentarAlbumComponent>;
        let service: ComentarAlbumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComentarAlbumComponent],
                providers: [
                    ComentarAlbumService
                ]
            })
            .overrideTemplate(ComentarAlbumComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarAlbumComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarAlbumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComentarAlbum(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.comentarAlbums[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
