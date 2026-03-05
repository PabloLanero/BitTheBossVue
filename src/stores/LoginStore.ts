import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useConstants } from './Constants'
import type { Login } from '@/models/DTO/LoginDTO'

export const useLogin = defineStore('login', () => {
  const { ApiUrl } = useConstants()
  const jwt = ref<string>(localStorage.getItem('token') ?? '')
  const isAuthenticated = computed(() => jwt.value.length > 0)

  async function login(credentials: Login): Promise<void> {
    const res = await fetch(ApiUrl + '/Login/login', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Error al iniciar sesión' }))
      throw new Error(error.message ?? 'Error al iniciar sesión')
    }

    const data = await res.json() as { token?: string }
    jwt.value = data.token ?? ''

    if (!jwt.value) {
      throw new Error('El backend no devolvió un token válido')
    }

    localStorage.setItem('token', jwt.value)
  }

  function logout(): void {
    jwt.value = ''
    localStorage.removeItem('token')
  }

  return { jwt, isAuthenticated, login, logout }
})
