/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RocktionaryTestModule } from '../../../test.module';
import { CancionDetailComponent } from '../../../../../../main/webapp/app/entities/cancion/cancion-detail.component';
import { CancionService } from '../../../../../../main/webapp/app/entities/cancion/cancion.service';
import { Cancion } from '../../../../../../main/webapp/app/entities/cancion/cancion.model';

describe('Component Tests', () => {

    describe('Cancion Management Detail Component', () => {
        let comp: CancionDetailComponent;
        let fixture: ComponentFixture<CancionDetailComponent>;
        let service: CancionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [CancionDetailComponent],
                providers: [
                    CancionService
                ]
            })
            .overrideTemplate(CancionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CancionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CancionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Cancion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cancion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
