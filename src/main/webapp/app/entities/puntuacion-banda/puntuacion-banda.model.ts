import { BaseEntity, User } from './../../shared';

export class PuntuacionBanda implements BaseEntity {
    constructor(
        public id?: number,
        public valoracion?: number,
        public fechaPuntuacion?: any,
        public banda_name?: string,
        public user?: User,
        public banda?: BaseEntity,
    ) {
    }
}
