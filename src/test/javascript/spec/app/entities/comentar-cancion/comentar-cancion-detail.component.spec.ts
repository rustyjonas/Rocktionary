/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RocktionaryTestModule } from '../../../test.module';
import { ComentarCancionDetailComponent } from '../../../../../../main/webapp/app/entities/comentar-cancion/comentar-cancion-detail.component';
import { ComentarCancionService } from '../../../../../../main/webapp/app/entities/comentar-cancion/comentar-cancion.service';
import { ComentarCancion } from '../../../../../../main/webapp/app/entities/comentar-cancion/comentar-cancion.model';

describe('Component Tests', () => {

    describe('ComentarCancion Management Detail Component', () => {
        let comp: ComentarCancionDetailComponent;
        let fixture: ComponentFixture<ComentarCancionDetailComponent>;
        let service: ComentarCancionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [ComentarCancionDetailComponent],
                providers: [
                    ComentarCancionService
                ]
            })
            .overrideTemplate(ComentarCancionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarCancionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarCancionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComentarCancion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.comentarCancion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
