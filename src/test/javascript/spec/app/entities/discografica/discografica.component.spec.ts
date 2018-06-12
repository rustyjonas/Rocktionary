/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { DiscograficaComponent } from '../../../../../../main/webapp/app/entities/discografica/discografica.component';
import { DiscograficaService } from '../../../../../../main/webapp/app/entities/discografica/discografica.service';
import { Discografica } from '../../../../../../main/webapp/app/entities/discografica/discografica.model';

describe('Component Tests', () => {

    describe('Discografica Management Component', () => {
        let comp: DiscograficaComponent;
        let fixture: ComponentFixture<DiscograficaComponent>;
        let service: DiscograficaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [DiscograficaComponent],
                providers: [
                    DiscograficaService
                ]
            })
            .overrideTemplate(DiscograficaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscograficaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscograficaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Discografica(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.discograficas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
