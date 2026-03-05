import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import  { useConstants } from './Constants'
import type { Register } from '@/models/DTO/RegisterDTO'

const { ApiUrl } =  useConstants()

export const useRegister = defineStore('jwt', () => {
  let jwt = ''

  async function register(register: Register){
    const headers = {
      'accept': '*/*',
      'Content-Type':'application/json'
    }
    let res = await fetch(ApiUrl+'/Login/register', {
      headers: headers,
      body: JSON.stringify(register)
    })

    let data = await res.json()

    jwt = data.token.result

  }
  

  return { jwt, register}
})
