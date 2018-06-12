/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RocktionaryTestModule } from '../../../test.module';
import { ComentarBandaDetailComponent } from '../../../../../../main/webapp/app/entities/comentar-banda/comentar-banda-detail.component';
import { ComentarBandaService } from '../../../../../../main/webapp/app/entities/comentar-banda/comentar-banda.service';
import { ComentarBanda } from '../../../../../../main/webapp/app/entities/comentar-banda/comentar-banda.model';

describe('Component Tests', () => {

    describe('ComentarBanda Management Detail Component', () => {
        let comp: ComentarBandaDetailComponent;
        let fixture: ComponentFixture<ComentarBandaDetailComponent>;
        let service: ComentarBandaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComentarBandaDetailComponent],
                providers: [
                    ComentarBandaService
                ]
            })
            .overrideTemplate(ComentarBandaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarBandaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarBandaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComentarBanda(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.comentarBanda).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
