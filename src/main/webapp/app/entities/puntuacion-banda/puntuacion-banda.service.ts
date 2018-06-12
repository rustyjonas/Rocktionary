import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PuntuacionBanda } from './puntuacion-banda.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PuntuacionBanda>;

@Injectable()
export class PuntuacionBandaService {

    private resourceUrl =  SERVER_API_URL + 'api/puntuacion-bandas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(puntuacionBanda: PuntuacionBanda): Observable<EntityResponseType> {
        const copy = this.convert(puntuacionBanda);
        return this.http.post<PuntuacionBanda>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(puntuacionBanda: PuntuacionBanda): Observable<EntityResponseType> {
        const copy = this.convert(puntuacionBanda);
        return this.http.put<PuntuacionBanda>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PuntuacionBanda>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PuntuacionBanda[]>> {
        const options = createRequestOption(req);
        return this.http.get<PuntuacionBanda[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PuntuacionBanda[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PuntuacionBanda = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PuntuacionBanda[]>): HttpResponse<PuntuacionBanda[]> {
        const jsonResponse: PuntuacionBanda[] = res.body;
        const body: PuntuacionBanda[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PuntuacionBanda.
     */
    private convertItemFromServer(puntuacionBanda: PuntuacionBanda): PuntuacionBanda {
        const copy: PuntuacionBanda = Object.assign({}, puntuacionBanda);
        copy.fechaPuntuacion = this.dateUtils
            .convertDateTimeFromServer(puntuacionBanda.fechaPuntuacion);
        return copy;
    }

    /**
     * Convert a PuntuacionBanda to a JSON which can be sent to the server.
     */
    private convert(puntuacionBanda: PuntuacionBanda): PuntuacionBanda {
        const copy: PuntuacionBanda = Object.assign({}, puntuacionBanda);

        copy.fechaPuntuacion = this.dateUtils.toDate(puntuacionBanda.fechaPuntuacion);
        return copy;
    }
}
