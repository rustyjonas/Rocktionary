import { BaseEntity } from './../../shared';

export class Album implements BaseEntity {
    constructor(
        public id?: number,
        public genero?: string,
        public nombre?: string,
        public numCanciones?: number,
        public formato?: string,
        public numCopias?: number,
        public reviews?: string,
        public discografica?: BaseEntity,
        public puntuaciones?: BaseEntity[],
        public comentarios?: BaseEntity[],
        public canciones?: BaseEntity[],
    ) {
    }
}
