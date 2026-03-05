import { defineStore } from 'pinia'
import { useConstants } from './Constants'
import type { Login } from '@/models/DTO/LoginDTO'

const { ApiUrl } = useConstants()

export const useLogin = defineStore('login', () => {
  let jwt = ''

  async function login(credentials: Login): Promise<void> {
    const headers = {
      accept: '*/*',
      'Content-Type': 'application/json',
    }
    const res = await fetch(ApiUrl + '/Login/login', {
      method: 'POST',
      headers,
      body: JSON.stringify(credentials),
    })
    const data = await res.json()
    jwt = data.token?.result ?? ''
  }

  return { jwt, login }
})
