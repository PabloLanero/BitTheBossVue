import type { Tropa } from "./Tropa";
import type { Usuario } from "./Usuario";

export interface Nodo{
    idNodo: number,
    arrTropas?: Tropa[],
    duenoNodo?: Usuario[]
}