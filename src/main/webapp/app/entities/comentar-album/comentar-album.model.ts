import { BaseEntity, User } from './../../shared';

export class ComentarAlbum implements BaseEntity {
    constructor(
        public id?: number,
        public comentario?: string,
        public fechaComentario?: any,
        public albumName?: string,
        public user?: User,
        public album?: BaseEntity,
    ) {
    }
}
