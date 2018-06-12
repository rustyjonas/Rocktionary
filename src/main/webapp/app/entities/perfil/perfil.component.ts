import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../shared/auth/account.service";
import {Principal} from "../../shared/auth/principal.service";
import {UserExt} from "../user-ext/user-ext.model";
import { UserExtService} from "../user-ext/user-ext.service";
import {User} from "../../shared/user/user.model";
import {Subscription} from "rxjs/Subscription";
import {VideoPlayerGlobals} from '../../video-player-globals';
import {ActivatedRoute} from "@angular/router";
import {JhiDataUtils, JhiEventManager} from "ng-jhipster";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgForm} from "@angular/forms";
import {UtilsService} from "../../utils.service";
@Component({
  selector: 'user',
  templateUrl: './perfil.component.html',
    styleUrls: [
      'perfil.scss'
  ]
})
export class PerfilComponent implements OnInit {
    public showVideoPlayer: boolean;
    public showVideo: boolean;
    userExt: UserExt;
    user : User;
    subscription: Subscription;

    public showTruncatedText: boolean;
    public activePlayer: boolean;
    private showGeneral: boolean;
    private routeUserName: any;

    private isSaving = false;
    private eventManager: JhiEventManager;

    constructor(
      private account: AccountService,
      private principal: Principal,
      private userExtService: UserExtService,
      private videoPlayerGlobals: VideoPlayerGlobals,
      private route: ActivatedRoute,
      private dataUtils: JhiDataUtils,
      private utils: UtilsService
  ) {

  }

  ngOnInit() {
      this.showVideoPlayer = true;
      this.showVideo = false;

      this.activePlayer = false;
      this.showTruncatedText = true;
      this.showGeneral = true;

      this.route.params.subscribe(param => {
          this.routeUserName = param.userName;
          this.userExtService.getUserExt(this.routeUserName).subscribe(user => {
              this.userExt = user;

              this.userExt.fotoUrl = this.utils.sanitizeUrl(`data:${this.userExt.fotoContentType};base64, ${this.userExt.foto}`)
          });
      })
      // blabla
  }

    onFileInputChange(e) {
        let files = e.target.files[0];

        if (files) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
                this.userExtService.updateImage (btoa(e.target.result), files.type, this.userExt.user.login)
                    .subscribe((userExt: UserExt) => {
                        this.userExt.fotoUrl = this.utils.sanitizeUrl(`data:${userExt.fotoContentType};base64, ${userExt.foto}`)
                    });
            };
            console.log(files);
            reader.readAsBinaryString(files);
        }
    }
}
