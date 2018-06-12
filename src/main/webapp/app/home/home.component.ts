import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

// import * as annyang from 'annyang';
import { Account, LoginModalService, Principal } from '../shared';

import { HomeService } from './home.service'
import {UtilsService} from '../utils.service';
import {SafeResourceUrl} from '@angular/platform-browser';
import {WindowService} from "../windowref.service";
import {Subscription} from "rxjs/Subscription";
import {SpotifyService} from "../spotify.service";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    private inputSearchText: string;
    private placeHolderText: string;
    private clickedButton: string;
    private searchCriteria: string;
    private timeOut: any;
    private isLoading: boolean;
    private results: any;
    private isError: boolean;
    private resultsText: string;
    private errorText: string;
    private showResultsContainer: boolean;
    public isListening: boolean;

    constructor (private principal: Principal,
                private loginModalService: LoginModalService,
                private eventManager: JhiEventManager,
                private homeService: HomeService,
                private utilsService: UtilsService,
                private window: WindowService,
                private detector: ChangeDetectorRef,
                private spotifyService: SpotifyService
    ) {
    }


    toSeconds (millis: number) {
        return this.utilsService.parseMillis(millis);
    }



    ngOnInit() {
        this.isListening = false;
        this.placeHolderText = 'albumes';
        this.clickedButton = 'albumes';
        this.inputSearchText = '';
        this.searchCriteria = 'album';
        this.isLoading = true;
        this.isError = false;
        this.errorText = '';
        this.showResultsContainer = false;

        this.principal.identity().then((account) => {
            this.account = account;
            this.homeService.inserToken(
                localStorage.getItem('spotifyToken').split(' ')[1],
                localStorage.getItem('refreshToken')
            )
                .subscribe(response => console.log(response))
        });


        // this.registerAuthenticationSuccess();
    }

    // toggleRecognition () {
    //     if (annyang.isListening()) {
    //         annyang.abort();
    //         this.isListening = false;
    //         return
    //     }


    //     const commands = {
    //         'Busca *criteria': criteria => {
    //             this.inputSearchText = criteria;
    //             this.isLoading = true;
    //             this.homeService.getSearchResults({
    //                 searchCriteria: this.searchCriteria,
    //                 searchQuery: this.inputSearchText
    //             }).subscribe( data => this.handleOnSuccess(data),
    //                 error => this.handleOnError(error));
    //             this.detector.detectChanges();
    //         }
    //     };
    //     annyang.addCommands(commands);
    //     annyang.start();
    //     annyang.setLanguage('es-ES');
    //     annyang.debug(true);
    //     this.isListening = true;
    // }

    sanitizeUrl (url: string): SafeResourceUrl {
        return this.utilsService.sanitizeUrl(url);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    // métodos de búsqueda
    handleOnChangePlaceHolderText(filter: string): void {
        this.clickedButton = this.placeHolderText = filter;
    }

    handleOnInputSearch() {
        this.showResultsContainer = !!this.inputSearchText;

        if (this.inputSearchText !== '') {

            this.isLoading = true;

            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                switch (this.placeHolderText) {
                    case 'canciones':
                        this.homeService.getCanciones(this.inputSearchText).subscribe(this.handleOnSuccess.bind(this), this.handleOnError.bind(this));
                        break;
                    case 'albumes':
                        this.homeService.getAlbumes(this.inputSearchText).subscribe(this.handleOnSuccess.bind(this), this.handleOnError.bind(this));
                        break;
                    case 'bandas':
                        this.homeService.getBandas(this.inputSearchText).subscribe(this.handleOnSuccess.bind(this), this.handleOnError.bind(this));
                        break;
                }
            }, 500);
        }

    }

    // error handling
    handleOnSuccess (response) {

        let hayResultados,
            resultados,
            modifier = '';

        switch (this.placeHolderText) {
            case 'canciones':
                modifier = 'ninguna canción';
                break;
            case 'albumes':
                modifier = 'ningún albúm';
                break;
            case 'bandas':
                modifier = 'ningúna banda';
                break;
        }

        this.isLoading = false;


        if (!response.length) {
            this.isError = true;
            this.errorText = `No se encontro ${modifier} con el nombre de "${this.inputSearchText}" `;
        } else {
            this.isError = false;
            this.resultsText = `Resultados con tú búsqueda con "${this.inputSearchText}"`;
            this.results = response;
        }

        // this.isLoading = false;
        // // albums | artists | tracks .items
        // if (res[this.searchCriteria+'s'].items.length === 0) {

        // } else {
        //     this.isError = false;
        //     this.resultsText = 'Resultados de tú búsqueda con ' + this.inputSearchText;
        //
        //     if (this.searchCriteria === 'artist') {
        //         this.results = res.artists.items.filter(artist =>
        //             artist.genres.indexOf('rock') >= 0 ||
        //             artist.genres.indexOf('metal') >= 0 ||
        //             artist.genres.indexOf('gothic metal') >= 0 ||
        //             artist.genres.indexOf('power metal') >= 0 ||
        //             artist.genres.indexOf('trash metal') >= 0 ||
        //             artist.genres.indexOf('pop rock') >= 0 ||
        //             artist.genres.indexOf('alternative rock') >= 0 ||
        //             artist.genres.indexOf('alternative metal') >= 0 ||
        //             artist.genres.indexOf('nu metal') >= 0 ||
        //             artist.genres.indexOf('rap metal') >= 0 ||
        //             artist.genres.indexOf('punk') >= 0 ||
        //             artist.genres.indexOf('country') >= 0 ||
        //             artist.genres.indexOf('death metal') >= 0 ||
        //             artist.genres.indexOf('folk metal') >= 0 ||
        //             artist.genres.indexOf('grunge') >= 0 ||
        //             artist.genres.indexOf('groove metal') >= 0
        //         )
        //
        //     } else if (this.searchCriteria === 'album') {
        //         this.homeService.getAlbumes(this.placeHolderText).subscribe(album => this.results = album);
        //     } else {
        //         this.results = res[this.searchCriteria+'s'].items;
        //     }
        //
        //
        // }
    }

    handleOnError (err) {
        this.isLoading = false;
        this.isError = true;
        switch(err.status) {
            case 401: this.errorText = 'Debes logearte con tu cuenta de para poder usar el buscador'; break;
            case 404: this.errorText = err.statusText; break;
            case 500: this.errorText = err.statusText;  break;
        }

    }

    commaSeparated(artists: string[]): string {
        return artists.join(',')
    }
}





