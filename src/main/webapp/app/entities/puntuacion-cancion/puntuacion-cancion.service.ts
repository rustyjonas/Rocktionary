import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PuntuacionCancion } from './puntuacion-cancion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PuntuacionCancion>;

@Injectable()
export class PuntuacionCancionService {

    private resourceUrl =  SERVER_API_URL + 'api/puntuacion-cancions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(puntuacionCancion: PuntuacionCancion): Observable<EntityResponseType> {
        const copy = this.convert(puntuacionCancion);
        return this.http.post<PuntuacionCancion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(puntuacionCancion: PuntuacionCancion): Observable<EntityResponseType> {
        const copy = this.convert(puntuacionCancion);
        return this.http.put<PuntuacionCancion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PuntuacionCancion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PuntuacionCancion[]>> {
        const options = createRequestOption(req);
        return this.http.get<PuntuacionCancion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PuntuacionCancion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PuntuacionCancion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PuntuacionCancion[]>): HttpResponse<PuntuacionCancion[]> {
        const jsonResponse: PuntuacionCancion[] = res.body;
        const body: PuntuacionCancion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PuntuacionCancion.
     */
    private convertItemFromServer(puntuacionCancion: PuntuacionCancion): PuntuacionCancion {
        const copy: PuntuacionCancion = Object.assign({}, puntuacionCancion);
        copy.fechaPuntuacion = this.dateUtils
            .convertDateTimeFromServer(puntuacionCancion.fechaPuntuacion);
        return copy;
    }

    /**
     * Convert a PuntuacionCancion to a JSON which can be sent to the server.
     */
    private convert(puntuacionCancion: PuntuacionCancion): PuntuacionCancion {
        const copy: PuntuacionCancion = Object.assign({}, puntuacionCancion);

        copy.fechaPuntuacion = this.dateUtils.toDate(puntuacionCancion.fechaPuntuacion);
        return copy;
    }
}
