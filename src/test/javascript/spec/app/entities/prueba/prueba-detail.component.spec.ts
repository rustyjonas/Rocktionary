/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RocktionaryTestModule } from '../../../test.module';
import { PruebaDetailComponent } from '../../../../../../main/webapp/app/entities/prueba/prueba-detail.component';
import { PruebaService } from '../../../../../../main/webapp/app/entities/prueba/prueba.service';
import { Prueba } from '../../../../../../main/webapp/app/entities/prueba/prueba.model';

describe('Component Tests', () => {

    describe('Prueba Management Detail Component', () => {
        let comp: PruebaDetailComponent;
        let fixture: ComponentFixture<PruebaDetailComponent>;
        let service: PruebaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [PruebaDetailComponent],
                providers: [
                    PruebaService
                ]
            })
            .overrideTemplate(PruebaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PruebaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PruebaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Prueba(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.prueba).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
