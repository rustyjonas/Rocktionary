import { BaseEntity } from './../../shared';

export class Cancion implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public duracion?: number,
        public letra?: string,
        public album?: BaseEntity,
        public puntuaciones?: BaseEntity[],
        public comentarios?: BaseEntity[],
    ) {
    }
}
