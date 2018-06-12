import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Banda } from './banda.model';
import { BandaService } from './banda.service';
import {UtilsService} from '../../utils.service';
import {DomSanitizer} from '@angular/platform-browser';
import {VideoPlayerGlobals} from '../../video-player-globals';
import {Principal} from "../../shared";
import {MusicPlayerService} from "../../music-player/music-player.service";
import {UserExtService} from "../user-ext";
import {PlayList} from "../../models/PlayList";
import {PlayLists} from "../../models/PlayLists";
import {Track} from "../../interfaces/SpotifyInterfaces";
import {NgbDropdown} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'jhi-banda-detail',
    templateUrl: './banda-detail.component.html',
    styleUrls: ['banda-detail.scss']
})
export class BandaDetailComponent implements OnInit {

    banda: any;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private showGeneral: boolean;
    private bandaBio: object;
    private topTracks: object;
    public showTruncatedText: boolean;
    public activePlayer: boolean;
    private activeButton: number;
    public showComentarios: boolean;
    public commentText: null;
    public bandaComments: string[];
    public loggedUser: string;
    public playLists: PlayLists;

    constructor (
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private bandaService: BandaService,
        private route: ActivatedRoute,
        private utils: UtilsService,
        private sanitizer: DomSanitizer,
        private videoPlayerGlobals: VideoPlayerGlobals,
        private principal: Principal,
        private musicPlayerService: MusicPlayerService,
        private userExtService: UserExtService
    ) {}

    ngOnInit() {
        this.activePlayer = false;
        this.showTruncatedText = true;
        this.showGeneral = true;
        this.showComentarios = false;

        this.principal.identity()
            .then(user => this.loggedUser = user.login);

        this.subscription = this.route.params.subscribe(params => {
            this.bandaService.getBanda(params['id'])
                .subscribe(banda => {
                    this.banda = banda;
                    this.bandaService.getBandaBio(this.banda.name)
                        .subscribe(info => this.bandaBio = info);

                    this.bandaService.getBandaComments (this.banda.name)
                        .subscribe((comments: string[]) => this.bandaComments = comments)
                });

            this.bandaService.getTopTracks(params['id'])
                .subscribe(topTracks => this.topTracks = topTracks)

        });


        this.userExtService.getUserPlayLists()
            .subscribe((playLists: PlayLists) => {
                this.playLists = playLists;
            })


        //this.registerChangeInBandas();
    }




    load(id) {
        this.bandaService.find(id)
            .subscribe((bandaResponse: HttpResponse<Banda>) => {
                this.banda = bandaResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        window.history.back();
    }



    toggleIcon (song, albumImage) {
        this.bandaService.getVideoTrack(song, this.banda.name).subscribe(video => {
            this.musicPlayerService.player.loadVideoById(video.items[0].id.videoId);
            this.musicPlayerService.group = this.banda.name;
            this.musicPlayerService.song = song;
            this.musicPlayerService.albumImage = albumImage;
        });
    }

    triggerClass  ($e) {
        Array.from($e.target.parentElement.children).forEach((tab: any) => tab.classList.remove('active'));
        $e.target.classList.add('active');
        switch ($e.target.dataset.tab) {
            case 'general': this.showComentarios = false; break;
            // case 'Seguidores': vm.showSeguidores = true;vm.showGeneral=false;vm.showComentarios=false;break;
            case 'comentarios': this.showComentarios = true; break;
        }
    };

    addComment () {
        this.bandaService.addComment({ comentario: this.commentText, bandaName: this.banda.name })
            .subscribe((newComment: string) => {
                this.bandaComments.push(newComment);
                this.commentText = null;
            })
    }

    removeComment(e, id) {
        e.target.parentElement.querySelector('.loader-container').style.display = 'block';
        this.bandaService.removeComment(id)
            .subscribe(() => {
                this.bandaComments = this.bandaComments.filter((comment: any) => comment.id !== id);
                e.target.parentElement.querySelector('.loader-container').style.display = 'none';
        })
    }
    addTrackToPlayList (playlist: PlayList, track: Track, dropDown: NgbDropdown) {
        this.userExtService.addTrackToPlayList(playlist, track)
            .subscribe((response: any) => {
                if (response.snapshot_id) {
                    dropDown.close()
                } else {
                    alert('No se pudo añadir canción a playlist: error 500')
                }
            });
    }
}
