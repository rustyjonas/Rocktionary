import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ComentarCancion } from './comentar-cancion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComentarCancion>;

@Injectable()
export class ComentarCancionService {

    private resourceUrl =  SERVER_API_URL + 'api/comentar-cancions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(comentarCancion: ComentarCancion): Observable<EntityResponseType> {
        const copy = this.convert(comentarCancion);
        return this.http.post<ComentarCancion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(comentarCancion: ComentarCancion): Observable<EntityResponseType> {
        const copy = this.convert(comentarCancion);
        return this.http.put<ComentarCancion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComentarCancion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComentarCancion[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComentarCancion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComentarCancion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComentarCancion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComentarCancion[]>): HttpResponse<ComentarCancion[]> {
        const jsonResponse: ComentarCancion[] = res.body;
        const body: ComentarCancion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComentarCancion.
     */
    private convertItemFromServer(comentarCancion: ComentarCancion): ComentarCancion {
        const copy: ComentarCancion = Object.assign({}, comentarCancion);
        copy.fechaComentario = this.dateUtils
            .convertDateTimeFromServer(comentarCancion.fechaComentario);
        return copy;
    }

    /**
     * Convert a ComentarCancion to a JSON which can be sent to the server.
     */
    private convert(comentarCancion: ComentarCancion): ComentarCancion {
        const copy: ComentarCancion = Object.assign({}, comentarCancion);

        copy.fechaComentario = this.dateUtils.toDate(comentarCancion.fechaComentario);
        return copy;
    }
}
