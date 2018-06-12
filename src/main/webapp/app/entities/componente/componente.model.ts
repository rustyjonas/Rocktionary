import { BaseEntity } from './../../shared';

export class Componente implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public edad?: number,
        public sexo?: string,
        public funcionGrupo?: string,
        public fotoContentType?: string,
        public foto?: any,
        public fechaEntrada?: any,
        public fechaSalida?: any,
        public banda?: BaseEntity,
    ) {
    }
}
