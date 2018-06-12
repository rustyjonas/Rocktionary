/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { CancionComponent } from '../../../../../../main/webapp/app/entities/cancion/cancion.component';
import { CancionService } from '../../../../../../main/webapp/app/entities/cancion/cancion.service';
import { Cancion } from '../../../../../../main/webapp/app/entities/cancion/cancion.model';

describe('Component Tests', () => {

    describe('Cancion Management Component', () => {
        let comp: CancionComponent;
        let fixture: ComponentFixture<CancionComponent>;
        let service: CancionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [CancionComponent],
                providers: [
                    CancionService
                ]
            })
            .overrideTemplate(CancionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CancionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CancionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Cancion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cancions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
