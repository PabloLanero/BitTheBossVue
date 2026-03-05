import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import  { useConstants } from './Constants'
import type { Register } from '@/models/DTO/RegisterDTO'

export const useRegister = defineStore('jwt', () => {
  const { ApiUrl } = useConstants()
  const jwt = ref<string>(localStorage.getItem('token') ?? '')
  const isAuthenticated = computed(() => jwt.value.length > 0)

  async function register(register: Register): Promise<void> {
    const res = await fetch(ApiUrl + '/Login/register', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(register),
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Error al registrar usuario' }))
      throw new Error(error.message ?? 'Error al registrar usuario')
    }

    const data = await res.json() as { token?: string }
    jwt.value = data.token ?? ''

    if (!jwt.value) {
      throw new Error('El backend no devolvió un token válido')
    }

    localStorage.setItem('token', jwt.value)
  }

  return { jwt, isAuthenticated, register }
})
