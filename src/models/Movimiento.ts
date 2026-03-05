import type { Nodo } from "./Nodo";
import type { Partida } from "./Partida";
import type { Tropa } from "./Tropa";

export interface Movimiento {
    id: number,
    tropa?: Tropa,
    nodoDestino?: Nodo,
    partida?: Partida  
}