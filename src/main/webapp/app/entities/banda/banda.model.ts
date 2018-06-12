import { BaseEntity } from './../../shared';

export class Banda implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public localizacion?: string,
        public datacreacion?: any,
        public anosactivo?: any,
        public temas?: string,
        public discografica?: string,
        public fotoContentType?: string,
        public foto?: any,
        public logoContentType?: string,
        public logo?: any,
        public pais?: string,
        public estado?: string,
        public genero?: string,
        public biografia?: string,
        public discograficas?: BaseEntity[],
        public componentes?: BaseEntity[],
        public puntuaciones?: BaseEntity[],
        public comentarios?: BaseEntity[],
    ) {
    }
}
