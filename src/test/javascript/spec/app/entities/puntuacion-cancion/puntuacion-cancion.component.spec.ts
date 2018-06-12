/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { PuntuacionCancionComponent } from '../../../../../../main/webapp/app/entities/puntuacion-cancion/puntuacion-cancion.component';
import { PuntuacionCancionService } from '../../../../../../main/webapp/app/entities/puntuacion-cancion/puntuacion-cancion.service';
import { PuntuacionCancion } from '../../../../../../main/webapp/app/entities/puntuacion-cancion/puntuacion-cancion.model';

describe('Component Tests', () => {

    describe('PuntuacionCancion Management Component', () => {
        let comp: PuntuacionCancionComponent;
        let fixture: ComponentFixture<PuntuacionCancionComponent>;
        let service: PuntuacionCancionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [PuntuacionCancionComponent],
                providers: [
                    PuntuacionCancionService
                ]
            })
            .overrideTemplate(PuntuacionCancionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PuntuacionCancionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuntuacionCancionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PuntuacionCancion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.puntuacionCancions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
