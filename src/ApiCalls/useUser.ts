import type { Usuario } from '@/models/Usuario'
import { useConstants } from '@/stores/Constants'

export const useUser = () => {
  const { ApiUrl } = useConstants()
  const urlUser = ApiUrl + '/Usuario'
  function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No hay token de autenticación')
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
      const error = await response.json().catch(() => ({ message: 'Error al obtener usuarios' }))
      throw new Error(error.message ?? 'Error al obtener usuarios')
    }

    return response.json()
  }

  async function getUsuarioById(id: number): Promise<Usuario> {
    const response = await fetch(`${urlUser}/${id}`, {
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error al obtener usuario' }))
      throw new Error(error.message ?? 'Error al obtener usuario')
    }

    return response.json()
  }

  return { getUsuarios, getUsuarioById }
}