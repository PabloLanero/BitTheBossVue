import type { Usuario } from '@/models/Usuario'
import { useConstants } from '@/stores/Constants'

export const useUser = () => {
  const { ApiUrl } = useConstants()
  const urlUser = `${ApiUrl}/Usuario`

  function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No authentication token')
    }

    return {
      Authorization: `Bearer ${token}`,
    }
  }

  async function getUsuarios(): Promise<Usuario[]> {
    const response = await fetch(urlUser, {
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error fetching users' }))
      throw new Error(error.message ?? 'Error fetching users')
    }

    return response.json()
  }

  async function getUsuarioById(id: number): Promise<Usuario> {
    const response = await fetch(`${urlUser}/${id}`, {
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error fetching user' }))
      throw new Error(error.message ?? 'Error fetching user')
    }

    return response.json()
  }

  async function updateUsuario(id: number, data: Partial<Usuario>): Promise<Usuario> {
    const response = await fetch(`${urlUser}/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error updating user' }))
      throw new Error(error.message ?? 'Error updating user')
    }

    return response.json()
  }

  return { getUsuarios, getUsuarioById, updateUsuario }
}
