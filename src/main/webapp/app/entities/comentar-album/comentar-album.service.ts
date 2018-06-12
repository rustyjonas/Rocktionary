import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ComentarAlbum } from './comentar-album.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComentarAlbum>;

@Injectable()
export class ComentarAlbumService {

    private resourceUrl =  SERVER_API_URL + 'api/comentar-albums';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(comentarAlbum: ComentarAlbum): Observable<EntityResponseType> {
        const copy = this.convert(comentarAlbum);
        return this.http.post<ComentarAlbum>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(comentarAlbum: ComentarAlbum): Observable<EntityResponseType> {
        const copy = this.convert(comentarAlbum);
        return this.http.put<ComentarAlbum>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComentarAlbum>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComentarAlbum[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComentarAlbum[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComentarAlbum[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComentarAlbum = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComentarAlbum[]>): HttpResponse<ComentarAlbum[]> {
        const jsonResponse: ComentarAlbum[] = res.body;
        const body: ComentarAlbum[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComentarAlbum.
     */
    private convertItemFromServer(comentarAlbum: ComentarAlbum): ComentarAlbum {
        const copy: ComentarAlbum = Object.assign({}, comentarAlbum);
        copy.fechaComentario = this.dateUtils
            .convertDateTimeFromServer(comentarAlbum.fechaComentario);
        return copy;
    }

    /**
     * Convert a ComentarAlbum to a JSON which can be sent to the server.
     */
    private convert(comentarAlbum: ComentarAlbum): ComentarAlbum {
        const copy: ComentarAlbum = Object.assign({}, comentarAlbum);

        copy.fechaComentario = this.dateUtils.toDate(comentarAlbum.fechaComentario);
        return copy;
    }
}
