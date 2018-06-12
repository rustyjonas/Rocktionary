import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable } from 'rxjs/Observable';
import {SpotifyService} from "../spotify.service";

@Injectable()
export class HomeService {

  private headers: any;
  private token = this.spotifyService.getToken();

  constructor (private http: HttpClient, private spotifyService: SpotifyService) {}

  getSearchResults (params: any): Observable<any> {
      return this.http
          .get(`https://api.spotify.com/v1/search/?q=${params.searchQuery}&type=${params.searchCriteria}`, {headers: { 'Authorization': this.token } })
  }


  getBandas (query: string) {
        return this.http.get(`/api/spotify-search-bandas/${query}`)
  }

  getAlbumes (query: string) {
        return this.http.get(`/api/spotify-search-albumes/${query}`)
  }

  getCanciones (query: string) {
        return this.http.get(`/api/spotify-search-canciones/${query}`)
  }




    inserToken (accessToken, refreshToken) {
      return this.http.post("/api/insert-token", { accessToken, refreshToken })
    }



}
