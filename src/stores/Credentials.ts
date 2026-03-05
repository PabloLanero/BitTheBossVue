import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { Register } from '@/models/DTO/RegisterDTO'





export const useRegister = defineStore('jwt', () => {
  let jwt = ''
  const ApiUrl = 'http://localhost:5211'
  
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
  

  return {ApiUrl, jwt, register}
})
