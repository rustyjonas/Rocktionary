import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ComentarBanda } from './comentar-banda.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComentarBanda>;

@Injectable()
export class ComentarBandaService {

    private resourceUrl =  SERVER_API_URL + 'api/comentar-bandas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(comentarBanda: ComentarBanda): Observable<EntityResponseType> {
        const copy = this.convert(comentarBanda);
        return this.http.post<ComentarBanda>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(comentarBanda: ComentarBanda): Observable<EntityResponseType> {
        const copy = this.convert(comentarBanda);
        return this.http.put<ComentarBanda>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComentarBanda>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComentarBanda[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComentarBanda[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComentarBanda[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComentarBanda = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComentarBanda[]>): HttpResponse<ComentarBanda[]> {
        const jsonResponse: ComentarBanda[] = res.body;
        const body: ComentarBanda[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComentarBanda.
     */
    private convertItemFromServer(comentarBanda: ComentarBanda): ComentarBanda {
        const copy: ComentarBanda = Object.assign({}, comentarBanda);
        copy.fechaComentario = this.dateUtils
            .convertDateTimeFromServer(comentarBanda.fechaComentario);
        return copy;
    }

    /**
     * Convert a ComentarBanda to a JSON which can be sent to the server.
     */
    private convert(comentarBanda: ComentarBanda): ComentarBanda {
        const copy: ComentarBanda = Object.assign({}, comentarBanda);

        copy.fechaComentario = this.dateUtils.toDate(comentarBanda.fechaComentario);
        return copy;
    }
}
