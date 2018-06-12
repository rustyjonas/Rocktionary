import { BaseEntity, User } from './../../shared';

export class UserFollowingUser implements BaseEntity {
    constructor(
        public id?: number,
        public since?: any,
        public usuarioOrigen?: User,
        public usuarioDestino?: User,
    ) {
    }
}
