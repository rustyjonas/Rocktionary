import {Route, Routes} from "@angular/router";
import { PerfilComponent } from "./perfil.component";
import {UserRouteAccessService} from "../../shared/auth/user-route-access-service";
import {PlaylistComponent} from "./playlist/playlist.component";
import {TrackComponent} from "./track/track.component";
import {AllplaylistComponent} from "./allplaylist/allplaylist.component";


export const perfilRoute: Routes = [
    {
        path: 'users/:userName',
        component: PerfilComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.perfil.title'
        },
        children: [
            { path: '', component: AllplaylistComponent },
            { path: 'playlist/:playListId', component: PlaylistComponent },
            { path: 'playlist/:playListId/:trackId', component: TrackComponent }
        ],
        canActivate: [UserRouteAccessService]
    }
];
