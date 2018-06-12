import {
    AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild,
    ViewChildren
} from '@angular/core';
import { Location } from '@angular/common';
import {UserExtService} from "../../user-ext";
import {SpotifyUser} from "../../../models/SpotifyUser";
import {PlayList} from "../../../models/PlayList";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../../utils.service";
import {SafeResourceUrl} from "@angular/platform-browser";
import {MusicPlayerService} from "../../../music-player/music-player.service";
import {CancionService} from "../../cancion";
import {Principal} from "../../../shared";
import {Track, TrackItem} from "../../../interfaces/SpotifyInterfaces";

@Component({
  selector: 'jhi-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.scss']
})
export class PlaylistComponent implements OnInit {


  private spotifyUser: SpotifyUser;
  private playList: PlayList;
  private user: any;

  constructor(
      private location: Location,
      private userExtService: UserExtService,
      private route: ActivatedRoute,
      private utils: UtilsService,
      public musicPlayerService: MusicPlayerService,
      public cancionService: CancionService,
      private rd: Renderer2,
      private router: Router,
      private principal: Principal
      ) { }

  ngOnInit() {
      this.principal.identity().then(user => this.user = user);
      this.route.params.subscribe(param => {
          this.userExtService
              .getSpotifyUser()
              .subscribe((spotifyUser: SpotifyUser) => {
                  this.spotifyUser = spotifyUser;
                  this.userExtService.getPlayList(this.spotifyUser.id, param.playListId)
                      .subscribe((playList: PlayList) => this.playList = playList);
              });
      });
  }

  goBack () {
      this.location.back();
  }

  sanitizeUrl (url: string): SafeResourceUrl {
      return this.utils.sanitizeUrl(url);
  }

  toggleIcon (track, artist, albumImage, artistId) {

      this.bootstrapVideo(track, artist, albumImage, artistId);
  }


    bootstrapVideo (artist, track, albumImage, artistId) {
        this.cancionService.getYoutubeVideo(artist, track)
            .subscribe(video => {
                this.musicPlayerService.player.loadVideoById(video.items[0].id.videoId);
                this.musicPlayerService.albumImage = albumImage;
                this.musicPlayerService.group = artist;
                this.musicPlayerService.song = track;
                this.musicPlayerService.artistId = artistId;

                this.musicPlayerService.playListId = this.playList.id;
                this.musicPlayerService.userLogin = this.user.login;
                this.musicPlayerService.playListName = this.playList.name;
            })
    }

    removePlayListTrack(track: Track) {
        if (confirm('Seguro que quieres borrar esta canción de esta playlist?')) {
            this.userExtService.removeTrackFromPlayList(this.spotifyUser.id, this.playList.id,  track.uri)
                .subscribe(res => {
                    this.playList.tracks.items = this.playList.tracks.items.filter((currentTrack: TrackItem) => currentTrack.track.id !== track.id)
                });
        }
    }
}
