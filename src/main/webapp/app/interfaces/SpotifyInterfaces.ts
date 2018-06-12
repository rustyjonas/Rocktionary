import {Artist} from "../models/Artist";

export interface Followers {
    href?: string;
    total?: number;
}

export interface ExternalUrls {
    spotify?: string;
}

export interface UserImages {
    height?: number;
    url?: string;
    width?: number;
}

export interface PlayListImages {
    url?: string;
}

export interface  PlayListOwner {
    external_urls?: ExternalUrls;
    href? :string;
    id? :string;
    type? :string;
    uri? :string
}

export interface Tracks {
    href? :string;
    items?: TrackItem[];
    limit? :number;
    next? :null;
    offset? :number;
    previous? :null;
    total? :number;
    type? :string;
    uri? :string;
}

interface VideoThumbNail {
    url? :null;
}

export interface TrackItem {
    added_at?: string;
    added_by?: AddedBy;
    is_local? :boolean;
    primary_color?: null;
    track? : Track;
    video_thumbnail? :VideoThumbNail
}

export interface AddedBy {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
}

interface ExternalIds {
    isrc? :string;
}

export interface Track {
    album?: TrackAlbum;
    artists?: Artist[];
    available_markets? :string[];
    disc_number? :number;
    duration_msg? :number;
    episode? :boolean;
    explicit? :boolean;
    external_ids? :ExternalIds;
    external_urls? :ExternalUrls;
    href? :string;
    id? :string;
    is_local? :boolean;
    name? :string;
    popularity? :number;
    preview_url? :string;
    track? :boolean;
    track_number? :number;
    type? :string;
    uri? :string;
}

export interface TrackAlbum {
    album_type? :string;
    available_markets? :string[];
    external_urls? :ExternalUrls;
    href?: string;
    id? :string;
    images?: UserImages[];
    name? :string;
    type? :string;
    uri? :string;
}

