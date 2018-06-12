import {Component, OnInit} from '@angular/core';
import {JhiLanguageService} from "ng-jhipster";
import {JhiLanguageHelper} from "../../shared/language/language.helper";

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html',
    styleUrls:['footer.scss']

})
export class FooterComponent implements OnInit{
    languages: any[];

    constructor(
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper
    ){

    }

    ngOnInit(){
        this.languageHelper.getAll().then((languages) =>{
            this.languages = languages;
        })
    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }


}
