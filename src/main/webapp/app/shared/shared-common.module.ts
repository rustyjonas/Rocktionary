import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/es';

import {
    RocktionarySharedLibsModule,
    JhiLanguageHelper,
    FindLanguageFromKeyPipe
} from './';

@NgModule({
    imports: [
        RocktionarySharedLibsModule
    ],
    declarations: [
        FindLanguageFromKeyPipe
    ],
    providers: [
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'es'
        },
    ],
    exports: [
        RocktionarySharedLibsModule,
        FindLanguageFromKeyPipe
    ]
})
export class RocktionarySharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
