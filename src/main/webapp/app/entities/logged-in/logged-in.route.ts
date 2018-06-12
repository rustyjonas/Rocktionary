import { Routes } from '@angular/router'
import { LoggedInComponent } from "./logged-in.component";

export const loggedInRoute: Routes = [
    {
        path:'logged-in',
        component: LoggedInComponent,
        data: {
            authorities : ['ROLE_USER'],
            pageTitle: 'roctionaryApp.equipo.title'
        }
    }

]
