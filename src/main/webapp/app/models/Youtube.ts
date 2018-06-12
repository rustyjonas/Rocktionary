export class YoutubeModel {
    constructor(
        public etag?: string,
        public items?: YoutubeItems[],
        public kind?: string,
        public nextPageToken?: string,
        public pageInfo?: {
            resultsPerPage: number,
            totalResults: number
        }
    ) {

    }
}

export interface YoutubeItems {
    id: YoutubeItemsId
}

export interface  YoutubeItemsId {
    videoId
}
