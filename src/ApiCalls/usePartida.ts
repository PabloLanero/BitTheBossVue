import { useConstants } from '@/stores/Constants'
import type { CreatePartidaDTO } from '@/models/DTO/CreatePartidaDTO'

export interface PartidaCreatedResponse {
  idPartida: string
  arrUsuario?: Array<{ id?: number; nombre?: string }>
}

export interface PartidaListItem {
  idPartida: string
  arrUsuario?: Array<{ id?: number; nombre?: string }>
  lstNodos?: Array<{ idNodo?: number }>
}

export const usePartida = () => {
  const { ApiUrl } = useConstants()

  function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No hay sesion activa')
    return {
      Authorization: `Bearer ${token}`,
    }
  }

  async function createPartida(payload: CreatePartidaDTO): Promise<PartidaCreatedResponse> {
    const response = await fetch(`${ApiUrl}/Partida`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error al crear la partida' }))
      throw new Error(error.message ?? 'Error al crear la partida')
    }

    const data = (await response.json()) as PartidaCreatedResponse
    return data
  }

  async function getPartidas(): Promise<PartidaListItem[]> {
    const response = await fetch(`${ApiUrl}/Partida`, {
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error al cargar partidas' }))
      throw new Error(error.message ?? 'Error al cargar partidas')
    }

    return (await response.json()) as PartidaListItem[]
  }

  return { createPartida, getPartidas }
}
