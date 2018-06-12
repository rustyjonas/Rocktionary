/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { ComentarBandaComponent } from '../../../../../../main/webapp/app/entities/comentar-banda/comentar-banda.component';
import { ComentarBandaService } from '../../../../../../main/webapp/app/entities/comentar-banda/comentar-banda.service';
import { ComentarBanda } from '../../../../../../main/webapp/app/entities/comentar-banda/comentar-banda.model';

describe('Component Tests', () => {

    describe('ComentarBanda Management Component', () => {
        let comp: ComentarBandaComponent;
        let fixture: ComponentFixture<ComentarBandaComponent>;
        let service: ComentarBandaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComentarBandaComponent],
                providers: [
                    ComentarBandaService
                ]
            })
            .overrideTemplate(ComentarBandaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarBandaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarBandaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComentarBanda(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.comentarBandas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
