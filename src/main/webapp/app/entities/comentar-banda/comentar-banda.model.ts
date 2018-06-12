import { BaseEntity, User } from './../../shared';

export class ComentarBanda implements BaseEntity {
    constructor(
        public id?: number,
        public comentario?: string,
        public fechaComentario?: any,
        public bandaName?: string,
        public user?: User,
        public banda?: BaseEntity,
    ) {
    }
}
