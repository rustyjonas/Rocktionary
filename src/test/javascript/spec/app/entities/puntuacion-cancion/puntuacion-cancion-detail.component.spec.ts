/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RocktionaryTestModule } from '../../../test.module';
import { PuntuacionCancionDetailComponent } from '../../../../../../main/webapp/app/entities/puntuacion-cancion/puntuacion-cancion-detail.component';
import { PuntuacionCancionService } from '../../../../../../main/webapp/app/entities/puntuacion-cancion/puntuacion-cancion.service';
import { PuntuacionCancion } from '../../../../../../main/webapp/app/entities/puntuacion-cancion/puntuacion-cancion.model';

describe('Component Tests', () => {

    describe('PuntuacionCancion Management Detail Component', () => {
        let comp: PuntuacionCancionDetailComponent;
        let fixture: ComponentFixture<PuntuacionCancionDetailComponent>;
        let service: PuntuacionCancionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [PuntuacionCancionDetailComponent],
                providers: [
                    PuntuacionCancionService
                ]
            })
            .overrideTemplate(PuntuacionCancionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PuntuacionCancionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuntuacionCancionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PuntuacionCancion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.puntuacionCancion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
