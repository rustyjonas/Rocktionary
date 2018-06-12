/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { PruebaComponent } from '../../../../../../main/webapp/app/entities/prueba/prueba.component';
import { PruebaService } from '../../../../../../main/webapp/app/entities/prueba/prueba.service';
import { Prueba } from '../../../../../../main/webapp/app/entities/prueba/prueba.model';

describe('Component Tests', () => {

    describe('Prueba Management Component', () => {
        let comp: PruebaComponent;
        let fixture: ComponentFixture<PruebaComponent>;
        let service: PruebaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [PruebaComponent],
                providers: [
                    PruebaService
                ]
            })
            .overrideTemplate(PruebaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PruebaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PruebaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Prueba(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pruebas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
