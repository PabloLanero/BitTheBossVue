import { defineStore } from 'pinia'

export const useConstants = defineStore('constants', () => {
  const ApiUrl = 'http://35.153.240.160:5211'

  return { ApiUrl }
})
