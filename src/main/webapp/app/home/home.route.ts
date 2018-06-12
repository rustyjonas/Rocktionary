import {Route, Routes} from '@angular/router';

import { HomeComponent } from './';
import {ParallaxComponent} from "../parallax/parallax.component";

export const HOME_ROUTE: Routes = [
    {
        path: '',
        component: ParallaxComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    },
    {
        path: 'home',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    }
];
