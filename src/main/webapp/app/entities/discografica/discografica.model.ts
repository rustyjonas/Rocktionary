import { BaseEntity } from './../../shared';

export class Discografica implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public albums?: BaseEntity[],
        public bandas?: BaseEntity[],
    ) {
    }
}
