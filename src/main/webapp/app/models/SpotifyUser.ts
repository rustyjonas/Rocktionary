import {ExternalUrls, Followers, UserImages} from "../interfaces/SpotifyInterfaces";

export class SpotifyUser {

    public birthdate?: string;
    public country?: string;
    public display_name?: string;
    public email?: string;
    public external_urls?: ExternalUrls;
    public followers?: Followers;
    public href?: string;
    public id?: string;
    public images: UserImages[];
    public product?: string;
    public type?: string;
    public uri?: string;
}


