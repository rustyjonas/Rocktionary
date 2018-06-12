import { Component, OnInit } from '@angular/core';
import {LoginModalService} from "../shared/login/login-modal.service";

@Component({
  selector: 'jhi-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.scss']
})
export class ParallaxComponent implements OnInit {

  constructor(
      private loginModalService: LoginModalService
  ) { }

  ngOnInit() {

  }



  login () {
      this.loginModalService.open();
  }

}
