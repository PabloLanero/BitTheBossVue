import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useConstants } from './Constants'
import type { Login } from '@/models/DTO/LoginDTO'
import { clearSessionToken, updateSessionToken } from '@/services/unityBridge'

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
      const error = await res.json().catch(() => ({ message: 'Login error' }))
      throw new Error(error.message ?? 'Login error')
    }

    const data = (await res.json()) as unknown
    jwt.value =
      typeof data === 'string'
        ? data
        : typeof data === 'object' && data !== null && 'token' in data
          ? String((data as { token?: unknown }).token ?? '')
          : ''

    if (!jwt.value) {
      throw new Error('The backend did not return a valid token')
    }

    localStorage.setItem('token', jwt.value)
    updateSessionToken(jwt.value)
  }

  function logout(): void {
    jwt.value = ''
    localStorage.removeItem('token')
    clearSessionToken()
  }

  return { jwt, isAuthenticated, login, logout }
})
