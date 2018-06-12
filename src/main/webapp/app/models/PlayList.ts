import {ExternalUrls, Followers, PlayListImages, PlayListOwner, Tracks} from "../interfaces/SpotifyInterfaces";

export class PlayList {
   public collaborative?: boolean;
   public description?: string;
   public external_urls?: ExternalUrls;
   public followers?: Followers;
   public href?: string;
   public id?: string;
   public images?: PlayListImages;
   public name?: string;
   public owner?: PlayListOwner;
   public primary_color? :null;
   public public?: boolean;
   public snapshot_id? :string;
   public tracks?: Tracks
}
