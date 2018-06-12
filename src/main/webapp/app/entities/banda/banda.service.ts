import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Banda } from './banda.model';
import {createRequestOption, User} from '../../shared';
import {WindowService} from '../../windowref.service';
import {YoutubeModel} from '../../models/Youtube';
import {SpotifyService} from "../../spotify.service";

export type EntityResponseType = HttpResponse<Banda>;

@Injectable()
export class BandaService {

    private resourceUrl =  SERVER_API_URL + 'api/bandas';
    private token = this.spotifyService.getToken();

    constructor(
        private http: HttpClient,
        private dateUtils: JhiDateUtils,
        private spotifyService: SpotifyService
    ) {

    }

    addTrackToAPlaylist(){
        const headers = {Authorization:this.token};

        return this.http.post(`https://api.spotify.com/v1/users/rustyjonas/playlists/65a27LRmsANxoCl1LvtcXj/tracks`, {
            headers: headers
        })
    }


    getBanda (id: number) {
        const headers = { 'Authorization': this.token };
        return this.http.get(`https://api.spotify.com/v1/artists/${id}`, {headers: headers})
    }

    getBandaBio (bandaNombre: string) {
        return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=10ceb7a9cb40ae1b5c0b517bc625c8f5&artist=${bandaNombre}&format=json`)
    }

    getTopTracks (id: number) {
        const headers = { 'Authorization': this.token };
        return this.http.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=ES`, {headers: headers})
    }

    getVideoTrack (bandaName: string,trackName: string): Observable<YoutubeModel> {
        return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${bandaName}, ${trackName}&maxResults=1&key=AIzaSyBh4jKVZPAs4VFdpr2RAdPa_3bHFVRjQXQ&type=video`)
    }


    updateRating (rating, bandaName) {
        return this.http.post(`${this.resourceUrl}/update-rating`, { rating, bandaName })
    }

    getRating () {
        return this.http.get(`${this.resourceUrl}/get-rating`)
    }


    addComment ({ comentario, bandaName }) {
        return this.http.post(`/api/comentar-banda`, { comentario, bandaName })
    }

    removeComment (id) {
        return this.http.delete(`/api/delete-banda-comment/${id}`)
    }

    getBandaComments(bandaName) {
        return this.http.get(`/api/get-banda-comments/${bandaName}`)
    }

    create(banda: Banda): Observable<EntityResponseType> {
        const copy = this.convert(banda);
        return this.http.post<Banda>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(banda: Banda): Observable<EntityResponseType> {
        const copy = this.convert(banda);
        return this.http.put<Banda>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Banda>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Banda[]>> {
        const options = createRequestOption(req);
        return this.http.get<Banda[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Banda[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }



    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Banda = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Banda[]>): HttpResponse<Banda[]> {
        const jsonResponse: Banda[] = res.body;
        const body: Banda[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Banda.
     */
    private convertItemFromServer(banda: Banda): Banda {
        const copy: Banda = Object.assign({}, banda);
        copy.datacreacion = this.dateUtils
            .convertLocalDateFromServer(banda.datacreacion);
        copy.anosactivo = this.dateUtils
            .convertLocalDateFromServer(banda.anosactivo);
        return copy;
    }

    /**
     * Convert a Banda to a JSON which can be sent to the server.
     */
    private convert(banda: Banda): Banda {
        const copy: Banda = Object.assign({}, banda);
        copy.datacreacion = this.dateUtils
            .convertLocalDateToServer(banda.datacreacion);
        copy.anosactivo = this.dateUtils
            .convertLocalDateToServer(banda.anosactivo);
        return copy;
    }


}
