/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { PuntuacionBandaComponent } from '../../../../../../main/webapp/app/entities/puntuacion-banda/puntuacion-banda.component';
import { PuntuacionBandaService } from '../../../../../../main/webapp/app/entities/puntuacion-banda/puntuacion-banda.service';
import { PuntuacionBanda } from '../../../../../../main/webapp/app/entities/puntuacion-banda/puntuacion-banda.model';

describe('Component Tests', () => {

    describe('PuntuacionBanda Management Component', () => {
        let comp: PuntuacionBandaComponent;
        let fixture: ComponentFixture<PuntuacionBandaComponent>;
        let service: PuntuacionBandaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [PuntuacionBandaComponent],
                providers: [
                    PuntuacionBandaService
                ]
            })
            .overrideTemplate(PuntuacionBandaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PuntuacionBandaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuntuacionBandaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PuntuacionBanda(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.puntuacionBandas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
