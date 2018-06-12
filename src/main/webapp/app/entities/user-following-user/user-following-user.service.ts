import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { UserFollowingUser } from './user-following-user.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserFollowingUser>;

@Injectable()
export class UserFollowingUserService {

    private resourceUrl =  SERVER_API_URL + 'api/user-following-users';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(userFollowingUser: UserFollowingUser): Observable<EntityResponseType> {
        const copy = this.convert(userFollowingUser);
        return this.http.post<UserFollowingUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userFollowingUser: UserFollowingUser): Observable<EntityResponseType> {
        const copy = this.convert(userFollowingUser);
        return this.http.put<UserFollowingUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserFollowingUser>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserFollowingUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserFollowingUser[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserFollowingUser[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserFollowingUser = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserFollowingUser[]>): HttpResponse<UserFollowingUser[]> {
        const jsonResponse: UserFollowingUser[] = res.body;
        const body: UserFollowingUser[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserFollowingUser.
     */
    private convertItemFromServer(userFollowingUser: UserFollowingUser): UserFollowingUser {
        const copy: UserFollowingUser = Object.assign({}, userFollowingUser);
        copy.since = this.dateUtils
            .convertDateTimeFromServer(userFollowingUser.since);
        return copy;
    }

    /**
     * Convert a UserFollowingUser to a JSON which can be sent to the server.
     */
    private convert(userFollowingUser: UserFollowingUser): UserFollowingUser {
        const copy: UserFollowingUser = Object.assign({}, userFollowingUser);

        copy.since = this.dateUtils.toDate(userFollowingUser.since);
        return copy;
    }
}
