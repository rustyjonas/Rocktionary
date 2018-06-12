/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RocktionaryTestModule } from '../../../test.module';
import { DiscograficaDetailComponent } from '../../../../../../main/webapp/app/entities/discografica/discografica-detail.component';
import { DiscograficaService } from '../../../../../../main/webapp/app/entities/discografica/discografica.service';
import { Discografica } from '../../../../../../main/webapp/app/entities/discografica/discografica.model';

describe('Component Tests', () => {

    describe('Discografica Management Detail Component', () => {
        let comp: DiscograficaDetailComponent;
        let fixture: ComponentFixture<DiscograficaDetailComponent>;
        let service: DiscograficaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [DiscograficaDetailComponent],
                providers: [
                    DiscograficaService
                ]
            })
            .overrideTemplate(DiscograficaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscograficaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscograficaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Discografica(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.discografica).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
