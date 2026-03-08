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

  async function getErrorMessage(response: Response, fallback: string): Promise<string> {
    const raw = await response.text().catch(() => '')
    if (!raw) return `${fallback} (HTTP ${response.status})`

    try {
      const parsed = JSON.parse(raw) as { message?: string; title?: string; error?: string }
      const message = parsed.message ?? parsed.title ?? parsed.error
      if (message) return `${message} (HTTP ${response.status})`
    } catch {
      // Not JSON, return plain text below.
    }

    return `${raw} (HTTP ${response.status})`
  }

  function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No active session')
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
      throw new Error(await getErrorMessage(response, 'Error creating match'))
    }

    const data = (await response.json()) as PartidaCreatedResponse
    return data
  }

  async function getPartidas(): Promise<PartidaListItem[]> {
    const response = await fetch(`${ApiUrl}/Partida`, {
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(await getErrorMessage(response, 'Error loading matches'))
    }

    return (await response.json()) as PartidaListItem[]
  }

  return { createPartida, getPartidas }
}
