import { Component, OnInit } from '@angular/core';
import {VideoPlayerGlobals} from '../video-player-globals';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent implements OnInit {

    // [template] usa variables globales no borrar injección.
    constructor(public videoPlayerGlobals: VideoPlayerGlobals) {}

    ngOnInit() {}

}
