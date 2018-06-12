/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RocktionaryTestModule } from '../../../test.module';
import { BandaDetailComponent } from '../../../../../../main/webapp/app/entities/banda/banda-detail.component';
import { BandaService } from '../../../../../../main/webapp/app/entities/banda/banda.service';
import { Banda } from '../../../../../../main/webapp/app/entities/banda/banda.model';

describe('Component Tests', () => {

    describe('Banda Management Detail Component', () => {
        let comp: BandaDetailComponent;
        let fixture: ComponentFixture<BandaDetailComponent>;
        let service: BandaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [BandaDetailComponent],
                providers: [
                    BandaService
                ]
            })
            .overrideTemplate(BandaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BandaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BandaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Banda(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.banda).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
