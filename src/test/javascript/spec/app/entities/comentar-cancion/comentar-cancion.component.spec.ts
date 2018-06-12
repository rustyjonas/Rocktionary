/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { ComentarCancionComponent } from '../../../../../../main/webapp/app/entities/comentar-cancion/comentar-cancion.component';
import { ComentarCancionService } from '../../../../../../main/webapp/app/entities/comentar-cancion/comentar-cancion.service';
import { ComentarCancion } from '../../../../../../main/webapp/app/entities/comentar-cancion/comentar-cancion.model';

describe('Component Tests', () => {

    describe('ComentarCancion Management Component', () => {
        let comp: ComentarCancionComponent;
        let fixture: ComponentFixture<ComentarCancionComponent>;
        let service: ComentarCancionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComentarCancionComponent],
                providers: [
                    ComentarCancionService
                ]
            })
            .overrideTemplate(ComentarCancionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarCancionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarCancionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComentarCancion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.comentarCancions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
