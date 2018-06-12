/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RocktionaryTestModule } from '../../../test.module';
import { UserFollowingUserDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-following-user/user-following-user-delete-dialog.component';
import { UserFollowingUserService } from '../../../../../../main/webapp/app/entities/user-following-user/user-following-user.service';

describe('Component Tests', () => {

    describe('UserFollowingUser Management Delete Component', () => {
        let comp: UserFollowingUserDeleteDialogComponent;
        let fixture: ComponentFixture<UserFollowingUserDeleteDialogComponent>;
        let service: UserFollowingUserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [UserFollowingUserDeleteDialogComponent],
                providers: [
                    UserFollowingUserService
                ]
            })
            .overrideTemplate(UserFollowingUserDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserFollowingUserDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFollowingUserService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
