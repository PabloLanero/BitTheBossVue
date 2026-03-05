import type { Partida } from "./Partida";
import type { Tier } from "./Tier";

export interface Usuario {
    usuarioId: number,
    nombre: string,
    correo: string,
    password?: string,
    visible: boolean,
    fechaCreacion: Date,
    rol: string,
    tier?: Tier,
    partidas?: Partida[]
}