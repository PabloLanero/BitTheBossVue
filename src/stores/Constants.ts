import { defineStore } from 'pinia'

export const useConstants = defineStore('constants', () => {
  const ApiUrl = 'http://localhost:5211'

  return { ApiUrl }
})
