/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RocktionaryTestModule } from '../../../test.module';
import { ComponenteDetailComponent } from '../../../../../../main/webapp/app/entities/componente/componente-detail.component';
import { ComponenteService } from '../../../../../../main/webapp/app/entities/componente/componente.service';
import { Componente } from '../../../../../../main/webapp/app/entities/componente/componente.model';

describe('Component Tests', () => {

    describe('Componente Management Detail Component', () => {
        let comp: ComponenteDetailComponent;
        let fixture: ComponentFixture<ComponenteDetailComponent>;
        let service: ComponenteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComponenteDetailComponent],
                providers: [
                    ComponenteService
                ]
            })
            .overrideTemplate(ComponenteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComponenteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComponenteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Componente(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.componente).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
