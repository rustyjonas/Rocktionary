export class UserPlaylist{
    constructor(
        public id?: string,
        public name?: string,
        public images?:[
            {
                height: number,
                url: string,
                width: number
            }
            ]

    ){}

}
