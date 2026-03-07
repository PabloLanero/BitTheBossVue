import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useConstants } from './Constants'
import type { Register } from '@/models/DTO/RegisterDTO'
import { clearSessionToken, readStoredSessionToken, updateSessionToken } from '@/services/unityBridge'

export const useRegister = defineStore('jwt', () => {
  const { ApiUrl } = useConstants()
  const jwt = ref<string>(readStoredSessionToken() || localStorage.getItem('token') || '')
  const isAuthenticated = computed(() => jwt.value.length > 0)

  function setJwtToken(token?: string | null): void {
    const nextToken = token ?? ''
    jwt.value = nextToken

    if (nextToken) {
      localStorage.setItem('token', nextToken)
    } else {
      localStorage.removeItem('token')
    }

    updateSessionToken(nextToken)
  }

  function refreshJwtToken(token?: string | null): void {
    setJwtToken(token)
  }

  function logout(): void {
    jwt.value = ''
    localStorage.removeItem('token')
    clearSessionToken()
  }

  async function register(registerData: Register): Promise<void> {
    const res = await fetch(`${ApiUrl}/Login/register`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Registration error' }))
      throw new Error(error.message ?? 'Registration error')
    }

    const data = (await res.json()) as unknown
    const token =
      typeof data === 'string'
        ? data
        : typeof data === 'object' && data !== null && 'token' in data
          ? typeof (data as { token?: unknown }).token === 'string'
            ? ((data as { token?: string }).token ?? '')
            : ((data as { token?: { result?: string } }).token?.result ?? '')
          : ''

    if (!token) {
      throw new Error('The backend did not return a valid token')
    }

    setJwtToken(token)
  }

  return { ApiUrl, jwt, isAuthenticated, register, setJwtToken, refreshJwtToken, logout }
})
