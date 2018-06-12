import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Prueba } from './prueba.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Prueba>;

@Injectable()
export class PruebaService {

    private resourceUrl =  SERVER_API_URL + 'api/pruebas';

    constructor(private http: HttpClient) { }

    create(prueba: Prueba): Observable<EntityResponseType> {
        const copy = this.convert(prueba);
        return this.http.post<Prueba>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(prueba: Prueba): Observable<EntityResponseType> {
        const copy = this.convert(prueba);
        return this.http.put<Prueba>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Prueba>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Prueba[]>> {
        const options = createRequestOption(req);
        return this.http.get<Prueba[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Prueba[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Prueba = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Prueba[]>): HttpResponse<Prueba[]> {
        const jsonResponse: Prueba[] = res.body;
        const body: Prueba[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Prueba.
     */
    private convertItemFromServer(prueba: Prueba): Prueba {
        const copy: Prueba = Object.assign({}, prueba);
        return copy;
    }

    /**
     * Convert a Prueba to a JSON which can be sent to the server.
     */
    private convert(prueba: Prueba): Prueba {
        const copy: Prueba = Object.assign({}, prueba);
        return copy;
    }
}
