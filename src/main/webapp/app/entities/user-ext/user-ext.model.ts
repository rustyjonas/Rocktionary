import { BaseEntity, User } from './../../shared';
import {SafeResourceUrl} from "@angular/platform-browser";

export class UserExt implements BaseEntity {
    constructor(
        public id?: number,
        public fotoContentType?: string,
        public fotoUrl?: SafeResourceUrl,
        public foto?: any,
        public latitud?: number,
        public longitud?: number,
        public localidad?: string,
        public spotifyToken?: string,
        public refreshToken?: string,
        public user?: User,
    ) {
    }
}
