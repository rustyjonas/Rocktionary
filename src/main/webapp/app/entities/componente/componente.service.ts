import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Componente } from './componente.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Componente>;

@Injectable()
export class ComponenteService {

    private resourceUrl =  SERVER_API_URL + 'api/componentes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(componente: Componente): Observable<EntityResponseType> {
        const copy = this.convert(componente);
        return this.http.post<Componente>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(componente: Componente): Observable<EntityResponseType> {
        const copy = this.convert(componente);
        return this.http.put<Componente>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Componente>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Componente[]>> {
        const options = createRequestOption(req);
        return this.http.get<Componente[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Componente[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Componente = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Componente[]>): HttpResponse<Componente[]> {
        const jsonResponse: Componente[] = res.body;
        const body: Componente[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Componente.
     */
    private convertItemFromServer(componente: Componente): Componente {
        const copy: Componente = Object.assign({}, componente);
        copy.fechaEntrada = this.dateUtils
            .convertLocalDateFromServer(componente.fechaEntrada);
        copy.fechaSalida = this.dateUtils
            .convertLocalDateFromServer(componente.fechaSalida);
        return copy;
    }

    /**
     * Convert a Componente to a JSON which can be sent to the server.
     */
    private convert(componente: Componente): Componente {
        const copy: Componente = Object.assign({}, componente);
        copy.fechaEntrada = this.dateUtils
            .convertLocalDateToServer(componente.fechaEntrada);
        copy.fechaSalida = this.dateUtils
            .convertLocalDateToServer(componente.fechaSalida);
        return copy;
    }
}
