import {Injectable} from "@angular/core";
import {Track} from "../interfaces/SpotifyInterfaces";

@Injectable()
export class MusicPlayerService {

    public player: YT.Player;
    public currentTime: any = '0:00';
    public duration: any;
    public progressBar: any;
    public videoInterval: any;
    public isPlaying = false;
    public videoId: any = null;

    public showPlayer: boolean = false;

    public rangeMax: any = 0;
    public rangeValue: any;
    public albumImage: any;


    public track: Track;

    public song: any;
    public group: any;
    public artistId: any;

    public showBackButton = false;
    public playListId;
    public playListName;
    public userLogin;


    onSavePlayer(player) {
        player.getIframe().hidden = true;
        console.log('YT.Player loaded ->', player);
        this.player = player;
    }

    onStateChange ({ target, data }) {
        if (data === 1) {
            this.initialize();
            this.isPlaying = true;
            this.showPlayer = true;
        } else if (data === 2) {
            this.isPlaying = false;
        }
    }

    initialize () {
        this.updateTimerDisplay();
        this.updateProgressBar();

        clearInterval(this.videoInterval);

        this.videoInterval = setInterval(() => {
            this.updateTimerDisplay();
            this.updateProgressBar();


        }, 1000)

    }

    formatTime (time) {

        time = Math.round(time);

        const minutes = Math.floor(time / 60),
            seconds = time - minutes * 60;

        return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }

    updateTimerDisplay () {
        this.currentTime = this.formatTime(this.player.getCurrentTime());
        this.duration = this.formatTime(this.player.getDuration());

        this.rangeValue = this.player.getCurrentTime().toFixed(1);
        this.rangeMax = this.player.getDuration().toFixed(1)
    }


    onProgressBarDrag () {
        this.player.seekTo(this.rangeValue, true);
    }

    updateProgressBar () {
        this.progressBar = (this.player.getCurrentTime() / this.player.getDuration()) / 100;

        this.rangeValue = this.player.getCurrentTime().toFixed(1);
        this.rangeMax = this.player.getDuration().toFixed(1)
    }


    togglePlay() {
        if (this.isPlaying) {
            this.player.pauseVideo();
            this.isPlaying = false;
        } else {
            this.player.playVideo();
            this.isPlaying = true;
        }
    }


    closePlayer() {
        this.showPlayer = false;
        this.player.stopVideo();
    }
}
