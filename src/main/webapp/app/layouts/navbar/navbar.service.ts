import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {


   showPerfil: boolean;

  constructor() {

      this.showPerfil = false;

  }

}
