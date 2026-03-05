import type { Usuario } from "@/models/Usuario";

import { useRegister } from "@/stores/Credentials";


const { jwt, ApiUrl } = useRegister()

export const useUser = () => {
    const urlUser = ApiUrl +'/Usuario'

    async function getUsuarios(): Promise<Usuario[]>{
        // Preparamos las credenciales
        const cabecera : any = {}
        cabecera['Accept'] = 'application/json'
        cabecera['Authorization']= 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2IiwidW5pcXVlX25hbWUiOiJVc2VyIiwicm9sZSI6IlVzdWFyaW8iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJteUN1c3RvbUNsYWltIjoibXlDdXN0b21DbGFpbVZhbHVlIiwibmJmIjoxNzcyNzM2ODM2LCJleHAiOjE3NzMzNDE2MzYsImlhdCI6MTc3MjczNjgzNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIzNyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcwMDAifQ.4q-ngUlpbdm0I1Dg1I_eqbVlU2yyUE6_Tf9sXO-Oqjs'
        cabecera['Access-Control-Allow-Origin'] = '*'
        cabecera['Access-Control-Allow-Methods'] = 'GET'
        cabecera['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept"
        
        let response = await fetch(urlUser,{
            // credentials: "include",
            method:'GET',
            headers: cabecera
        }) 

        let result : Usuario[] = await response.json()

        return result
    } 

    return { getUsuarios }
}