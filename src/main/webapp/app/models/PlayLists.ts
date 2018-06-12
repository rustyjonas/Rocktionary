import {PlayList} from "./PlayList";

export class PlayLists {
    public href? :string;
    public items? :PlayList[];
    public limit? :number;
    public next? :null;
    public offset? :number;
    public previous? :null;
    public total? :number;
}
