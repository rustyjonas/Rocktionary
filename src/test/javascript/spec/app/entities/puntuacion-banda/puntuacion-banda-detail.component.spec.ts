/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RocktionaryTestModule } from '../../../test.module';
import { PuntuacionBandaDetailComponent } from '../../../../../../main/webapp/app/entities/puntuacion-banda/puntuacion-banda-detail.component';
import { PuntuacionBandaService } from '../../../../../../main/webapp/app/entities/puntuacion-banda/puntuacion-banda.service';
import { PuntuacionBanda } from '../../../../../../main/webapp/app/entities/puntuacion-banda/puntuacion-banda.model';

describe('Component Tests', () => {

    describe('PuntuacionBanda Management Detail Component', () => {
        let comp: PuntuacionBandaDetailComponent;
        let fixture: ComponentFixture<PuntuacionBandaDetailComponent>;
        let service: PuntuacionBandaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [PuntuacionBandaDetailComponent],
                providers: [
                    PuntuacionBandaService
                ]
            })
            .overrideTemplate(PuntuacionBandaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PuntuacionBandaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuntuacionBandaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PuntuacionBanda(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.puntuacionBanda).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
