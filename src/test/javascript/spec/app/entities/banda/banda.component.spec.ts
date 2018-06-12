/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { BandaComponent } from '../../../../../../main/webapp/app/entities/banda/banda.component';
import { BandaService } from '../../../../../../main/webapp/app/entities/banda/banda.service';
import { Banda } from '../../../../../../main/webapp/app/entities/banda/banda.model';

describe('Component Tests', () => {

    describe('Banda Management Component', () => {
        let comp: BandaComponent;
        let fixture: ComponentFixture<BandaComponent>;
        let service: BandaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [BandaComponent],
                providers: [
                    BandaService
                ]
            })
            .overrideTemplate(BandaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BandaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BandaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Banda(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bandas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
