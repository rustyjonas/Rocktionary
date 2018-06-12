/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { PuntuacionAlbumComponent } from '../../../../../../main/webapp/app/entities/puntuacion-album/puntuacion-album.component';
import { PuntuacionAlbumService } from '../../../../../../main/webapp/app/entities/puntuacion-album/puntuacion-album.service';
import { PuntuacionAlbum } from '../../../../../../main/webapp/app/entities/puntuacion-album/puntuacion-album.model';

describe('Component Tests', () => {

    describe('PuntuacionAlbum Management Component', () => {
        let comp: PuntuacionAlbumComponent;
        let fixture: ComponentFixture<PuntuacionAlbumComponent>;
        let service: PuntuacionAlbumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [PuntuacionAlbumComponent],
                providers: [
                    PuntuacionAlbumService
                ]
            })
            .overrideTemplate(PuntuacionAlbumComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PuntuacionAlbumComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuntuacionAlbumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PuntuacionAlbum(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.puntuacionAlbums[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
