import {Component, OnInit} from '@angular/core';
import {PlayList} from "../../../models/PlayList";
import {SpotifyUser} from "../../../models/SpotifyUser";
import {UserExtService} from "../../user-ext";
import {PlayLists} from "../../../models/PlayLists";

@Component({
  selector: 'jhi-allplaylist',
  templateUrl: './allplaylist.component.html',
  styleUrls: ['./allplaylist.scss']
})
export class AllplaylistComponent implements OnInit {


    public spotifyUser: SpotifyUser;
    public playLists: PlayLists;


    public showCreatePlayListform: boolean = false;
    public showAddTrackToPlayListForm: boolean = false;
    public showFormError: boolean = false;


    public playListName: string;
    public playListDescripcion: string;

    constructor(private userExtService: UserExtService) {}

    ngOnInit() {
        this.userExtService.getSpotifyUser().subscribe((spotifyUser: SpotifyUser) => this.spotifyUser = spotifyUser);
        this.userExtService.getUserPlayLists().subscribe((playList: PlayLists) =>  {

            this.playLists = playList;

            this.playLists.items.forEach((storedPlayList: PlayList) => {
                this.userExtService.getPlayList(this.spotifyUser.id, storedPlayList.id)
                    .subscribe((playList: PlayList) => {
                        storedPlayList.description = playList.description
                    })
            });
        });

        console.log(this);
    }

    createPlayList() {
        const playListData = {
            name: this.playListName,
            public: true,
            collaborative: false,
            description: this.playListDescripcion
        };

        if (!playListData.name) {
            this.showFormError = true;
            return;
        }

        this.userExtService.createPlayList (this.spotifyUser.id, playListData)
            .subscribe((createdPlayList: PlayList) => {
                console.log(createdPlayList);
                this.playLists.items.push(createdPlayList);
                this.showFormError = false;
                this.showCreatePlayListform = false;
                this.playListName = this.playListDescripcion = null;
        });
    }

    removePlayList(userId: string, playListId: string) {
        if (confirm('¿Seguro que quieres borrar esta playlist? (esto afectará a tu cuenta de spotify también.)')) {
            this.userExtService.removePlayList(userId, playListId)
                .subscribe((response: Response) => this.playLists.items = this.playLists.items.filter((list: PlayList) => list.id !== playListId))
        }
    }

    addTrackToPlayList($event) {
        console.log('adding track...')
    }

    editPlayList(userId: string, playListId: string) {
        console.log(userId, playListId)
    }
}
