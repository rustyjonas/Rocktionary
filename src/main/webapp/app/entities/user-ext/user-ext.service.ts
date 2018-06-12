import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserExt } from './user-ext.model';
import { createRequestOption } from '../../shared';
import {YoutubeModel} from "../../models/Youtube";
import {SpotifyService} from "../../spotify.service";
import {PlayList} from "../../models/PlayList";
import {PlayLists} from "../../models/PlayLists";
import {SpotifyUser} from "../../models/SpotifyUser";
import {Track} from "../../interfaces/SpotifyInterfaces";

export type EntityResponseType = HttpResponse<UserExt>;

@Injectable()
export class UserExtService {

    private resourceUrl =  SERVER_API_URL + 'api/user-exts';
    private resourceUrl2 =  SERVER_API_URL + 'api/user-exts/by-user';
    private token = this.spotifyService.getToken();


    public playLists: PlayLists;
    public spotifyUser: SpotifyUser;


    constructor(private http: HttpClient, private spotifyService: SpotifyService) {}


    getVideoTrack (bandaName: string,trackName: string): Observable<YoutubeModel> {
        return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${bandaName}, ${trackName}&maxResults=1&key=AIzaSyBh4jKVZPAs4VFdpr2RAdPa_3bHFVRjQXQ&type=video`)
    }



    getSpotifyUser () {
        return this.http.get('https://api.spotify.com/v1/me/', { headers: { Authorization: this.token } })
    }

    createPlayList (userId, playListData) {
        return this.http.post(`https://api.spotify.com/v1/users/${userId}/playlists`, playListData, { headers: { Authorization: this.token }})
    }

    getUserPlayLists (): Observable<PlayLists> {
        return this.http.get<PlayLists>('https://api.spotify.com/v1/me/playlists', {
            headers: { Authorization: this.token }
        });
    }

    getPlayList (userId, playListId) {
        return this.http.get<PlayList>(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}`, {headers: {Authorization: this.token}})
    }

    getUserTracksByPlayList () {
        return this.http.get('https://api.spotify.com/v1/users/rustyjonas/playlists/65a27LRmsANxoCl1LvtcXj/tracks', {
            headers: {Authorization: this.token}
        })
    }

    removeTrackFromPlayList (userId: string, id, uri) {

        let options = {
            headers: { Authorization: this.token },
            body: { tracks: [{ uri }] }
        };

        return this.http.delete(`https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks`, options)
    }

    addTrackToPlayList (playList: PlayList, track: Track) {
        let tracks = {uris: [track.uri]};
        return this.http.post(`https://api.spotify.com/v1/users/${playList.owner.id}/playlists/${playList.id}/tracks`, tracks, {
            headers: { Authorization: this.token }
        })
    }

    removePlayList(userId: string, trackId: string) {
        return this.http.delete(`https://api.spotify.com/v1/users/${userId}/playlists/${trackId}/followers`, {
            headers: {Authorization: this.token}
        })
    }

    getUserExt (userName) {
        return this.http.get(`/api/get-user-ext/${userName}`)
    }

    create(userExt: UserExt): Observable<EntityResponseType> {
        const copy = this.convert(userExt);
        return this.http.post<UserExt>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userExt: UserExt): Observable<EntityResponseType> {
        const copy = this.convert(userExt);
        return this.http.put<UserExt>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserExt>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByUser(id: number): Observable<EntityResponseType> {
        return this.http.get<UserExt>(`${this.resourceUrl2}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserExt[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserExt[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserExt[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserExt = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserExt[]>): HttpResponse<UserExt[]> {
        const jsonResponse: UserExt[] = res.body;
        const body: UserExt[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserExt.
     */
    private convertItemFromServer(userExt: UserExt): UserExt {
        const copy: UserExt = Object.assign({}, userExt);
        return copy;
    }

    /**
     * Convert a UserExt to a JSON which can be sent to the server.
     */
    private convert(userExt: UserExt): UserExt {
        const copy: UserExt = Object.assign({}, userExt);
        return copy;
    }


    updateImage(base64Image, contentType, userLogin) {
        return this.http.put(`/api/user-ext/update-img`, { base64Image, contentType, userLogin });
    }
}
