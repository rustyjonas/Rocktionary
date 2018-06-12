import { BaseEntity, User } from './../../shared';

export class ComentarCancion implements BaseEntity {
    constructor(
        public id?: number,
        public comentario?: string,
        public fechaComentario?: any,
        public user?: User,
        public cancion?: BaseEntity,
    ) {
    }
}
