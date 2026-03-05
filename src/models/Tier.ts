import type { Usuario } from "./Usuario";

export interface Tier{
    id: number,
    titulo: string,
    fechaCreacion: Date,
    visible: boolean,
    usuarioId?: Usuario
}