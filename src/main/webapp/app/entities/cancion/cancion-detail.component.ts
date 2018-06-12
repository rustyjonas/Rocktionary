import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { YT } from 'ngx-youtube-player/src/services/youtube-player.service';

import { Cancion } from './cancion.model';
import { CancionService } from './cancion.service';
import {BandaService} from '../banda';
import {YoutubeModel} from '../../models/Youtube';
import {UtilsService} from '../../utils.service';
import {SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'jhi-cancion-detail',
    templateUrl: './cancion-detail.component.html',
    styleUrls: ['./cancion-detail.scss']
})
export class CancionDetailComponent implements OnInit {

    public cancion;
    public banda;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    public videoUrl: SafeResourceUrl;

    public player: YT.Player;
    public id = null;
    public max: number;
    public rangeVal: number;
    public isPlaying: boolean;
    private timer: string;
    public currentDuration: string;
    public totalDuration: string;
    public videoInterval: any;
    public videoThumbImg: string;

    constructor(
        private eventManager: JhiEventManager,
        private cancionService: CancionService,
        private bandaService: BandaService,
        private route: ActivatedRoute,
        private utilsService: UtilsService
    ) {
    }

    ngOnInit() {

        this.isPlaying = false;
        this.rangeVal = 0;

        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            this.cancionService.getCancion(params['id']).subscribe(cancion => {
                this.cancion = cancion;
                this.bandaService.getBanda(this.cancion.album.artists[0].id).subscribe(banda => this.banda = banda);
                this.cancionService.getYoutubeVideo(this.cancion.album.artists[0].name, this.cancion.name).subscribe(video => {
                    console.log(video);
                    console.log(cancion);
                    this.id = video.items[0].id.videoId;
                    this.videoUrl = this.utilsService.sanitizeUrl(`https://www.youtube.com/embed/${video.items[0].id.videoId}?autoplay=1&rel=0`);
                })
            });
        });
        // this.registerChangeInCancions();
    }

    dragg () {
        console.log('ewqewq');
        this.player.seekTo(this.rangeVal, true);
    }


    secondsToMinutes (seconds: number): string {
        let minutes = Math.floor(seconds / 60);
        return minutes + ':' + this.pad( (seconds - minutes * 60) );
    }

    pad(num) {
        return ("0"+num).slice(-2);
    }




    savePlayer (player) {
        console.log(player.getDuration());
        this.player = player;
        player.a.hidden = true;
        setTimeout(() => {
            this.player.cueVideoById(this.id);
        }, 500);
    }

    initInterval () {
        this.videoInterval = setInterval(() => {
            let currentTime = parseInt(this.player.getCurrentTime().toFixed(0));
            let totalDuration = parseInt(this.player.getDuration().toFixed(1));
            this.rangeVal = currentTime;
            this.max = totalDuration;
            this.currentDuration = this.secondsToMinutes(currentTime);
            this.totalDuration = this.secondsToMinutes(totalDuration);

            console.log('current Duration ->', this.currentDuration);
            console.log('total Duration ->', this.totalDuration)
        }, 1000);
    }

    toggleVideo () {
        if (this.player.getPlayerState() === 1) {
            this.isPlaying = false;
            clearInterval(this.videoInterval);
            this.player.pauseVideo();
        } else {
            this.isPlaying = true;
            this.player.playVideo();
            this.initInterval();
        }
    }

    onStateChange ($e) {
       // if ($e.data === 2) {
       //     this.isPlaying = false;
       //     clearInterval(this.videoInterval)
       // } else {
       //     this.isPlaying = true;
       //     this.initInterval();
       // }
    }

    load(id) {
        this.cancionService.find(id)
            .subscribe((cancionResponse: HttpResponse<Cancion>) => {
                this.cancion = cancionResponse.body;
            });
    }

}
