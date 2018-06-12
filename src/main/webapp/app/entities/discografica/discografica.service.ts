import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Discografica } from './discografica.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Discografica>;

@Injectable()
export class DiscograficaService {

    private resourceUrl =  SERVER_API_URL + 'api/discograficas';

    constructor(private http: HttpClient) { }

    create(discografica: Discografica): Observable<EntityResponseType> {
        const copy = this.convert(discografica);
        return this.http.post<Discografica>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(discografica: Discografica): Observable<EntityResponseType> {
        const copy = this.convert(discografica);
        return this.http.put<Discografica>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Discografica>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Discografica[]>> {
        const options = createRequestOption(req);
        return this.http.get<Discografica[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Discografica[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Discografica = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Discografica[]>): HttpResponse<Discografica[]> {
        const jsonResponse: Discografica[] = res.body;
        const body: Discografica[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Discografica.
     */
    private convertItemFromServer(discografica: Discografica): Discografica {
        const copy: Discografica = Object.assign({}, discografica);
        return copy;
    }

    /**
     * Convert a Discografica to a JSON which can be sent to the server.
     */
    private convert(discografica: Discografica): Discografica {
        const copy: Discografica = Object.assign({}, discografica);
        return copy;
    }
}
