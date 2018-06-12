/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { ComponenteComponent } from '../../../../../../main/webapp/app/entities/componente/componente.component';
import { ComponenteService } from '../../../../../../main/webapp/app/entities/componente/componente.service';
import { Componente } from '../../../../../../main/webapp/app/entities/componente/componente.model';

describe('Component Tests', () => {

    describe('Componente Management Component', () => {
        let comp: ComponenteComponent;
        let fixture: ComponentFixture<ComponenteComponent>;
        let service: ComponenteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComponenteComponent],
                providers: [
                    ComponenteService
                ]
            })
            .overrideTemplate(ComponenteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComponenteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComponenteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Componente(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.componentes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
