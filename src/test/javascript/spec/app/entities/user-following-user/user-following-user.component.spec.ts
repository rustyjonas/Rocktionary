/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RocktionaryTestModule } from '../../../test.module';
import { UserFollowingUserComponent } from '../../../../../../main/webapp/app/entities/user-following-user/user-following-user.component';
import { UserFollowingUserService } from '../../../../../../main/webapp/app/entities/user-following-user/user-following-user.service';
import { UserFollowingUser } from '../../../../../../main/webapp/app/entities/user-following-user/user-following-user.model';

describe('Component Tests', () => {

    describe('UserFollowingUser Management Component', () => {
        let comp: UserFollowingUserComponent;
        let fixture: ComponentFixture<UserFollowingUserComponent>;
        let service: UserFollowingUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RocktionaryTestModule],
                declarations: [UserFollowingUserComponent],
                providers: [
                    UserFollowingUserService
                ]
            })
            .overrideTemplate(UserFollowingUserComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserFollowingUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFollowingUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserFollowingUser(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userFollowingUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
