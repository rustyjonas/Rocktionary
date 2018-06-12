import { BaseEntity } from './../../shared';

export class Prueba implements BaseEntity {
    constructor(
        public id?: number,
        public fotoContentType?: string,
        public foto?: any,
    ) {
    }
}
