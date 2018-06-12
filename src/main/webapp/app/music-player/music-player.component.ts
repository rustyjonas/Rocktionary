import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CancionService} from "../entities/cancion";
import {MusicPlayerService} from "./music-player.service";

@Component({
  selector: 'music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.scss']
})
export class MusicPlayerComponent implements OnInit {

  constructor(private cancionService: CancionService, public musicPlayerService: MusicPlayerService) { }

  ngOnInit() {
  }



}
