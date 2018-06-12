/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { AlbumComponent } from '../../../../../../main/webapp/app/entities/album/album.component';
import { AlbumService } from '../../../../../../main/webapp/app/entities/album/album.service';
import { Album } from '../../../../../../main/webapp/app/entities/album/album.model';

describe('Component Tests', () => {

    describe('Album Management Component', () => {
        let comp: AlbumComponent;
        let fixture: ComponentFixture<AlbumComponent>;
        let service: AlbumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [AlbumComponent],
                providers: [
                    AlbumService
                ]
            })
            .overrideTemplate(AlbumComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlbumComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlbumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Album(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.albums[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
