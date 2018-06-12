import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PuntuacionAlbum } from './puntuacion-album.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PuntuacionAlbum>;

@Injectable()
export class PuntuacionAlbumService {

    private resourceUrl =  SERVER_API_URL + 'api/puntuacion-albums';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(puntuacionAlbum: PuntuacionAlbum): Observable<EntityResponseType> {
        const copy = this.convert(puntuacionAlbum);
        return this.http.post<PuntuacionAlbum>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(puntuacionAlbum: PuntuacionAlbum): Observable<EntityResponseType> {
        const copy = this.convert(puntuacionAlbum);
        return this.http.put<PuntuacionAlbum>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PuntuacionAlbum>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PuntuacionAlbum[]>> {
        const options = createRequestOption(req);
        return this.http.get<PuntuacionAlbum[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PuntuacionAlbum[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PuntuacionAlbum = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PuntuacionAlbum[]>): HttpResponse<PuntuacionAlbum[]> {
        const jsonResponse: PuntuacionAlbum[] = res.body;
        const body: PuntuacionAlbum[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PuntuacionAlbum.
     */
    private convertItemFromServer(puntuacionAlbum: PuntuacionAlbum): PuntuacionAlbum {
        const copy: PuntuacionAlbum = Object.assign({}, puntuacionAlbum);
        copy.fechaPuntuacion = this.dateUtils
            .convertDateTimeFromServer(puntuacionAlbum.fechaPuntuacion);
        return copy;
    }

    /**
     * Convert a PuntuacionAlbum to a JSON which can be sent to the server.
     */
    private convert(puntuacionAlbum: PuntuacionAlbum): PuntuacionAlbum {
        const copy: PuntuacionAlbum = Object.assign({}, puntuacionAlbum);

        copy.fechaPuntuacion = this.dateUtils.toDate(puntuacionAlbum.fechaPuntuacion);
        return copy;
    }
}
