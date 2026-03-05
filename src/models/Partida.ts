import type { Movimiento } from "./Movimiento";
import type { Nodo } from "./Nodo";
import type { Usuario } from "./Usuario";

export interface Partida{
    idPartida: string,
    arrUsuario?: Usuario[],
    lstNodos?: Nodo[],
    movimientos?: Movimiento[]
}