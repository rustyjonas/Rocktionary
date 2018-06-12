/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RocktionaryTestModule } from '../../../test.module';
import { UserFollowingUserDetailComponent } from '../../../../../../main/webapp/app/entities/user-following-user/user-following-user-detail.component';
import { UserFollowingUserService } from '../../../../../../main/webapp/app/entities/user-following-user/user-following-user.service';
import { UserFollowingUser } from '../../../../../../main/webapp/app/entities/user-following-user/user-following-user.model';

describe('Component Tests', () => {

    describe('UserFollowingUser Management Detail Component', () => {
        let comp: UserFollowingUserDetailComponent;
        let fixture: ComponentFixture<UserFollowingUserDetailComponent>;
        let service: UserFollowingUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [UserFollowingUserDetailComponent],
                providers: [
                    UserFollowingUserService
                ]
            })
            .overrideTemplate(UserFollowingUserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserFollowingUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFollowingUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserFollowingUser(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userFollowingUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
