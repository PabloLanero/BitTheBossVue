import type { Usuario } from "@/models/Usuario";
import { useConstants } from "@/stores/Constants";

const { ApiUrl} = useConstants()


export const useUser = () => {
    const urlUser = ApiUrl +'/Usuario'

    async function getUsuarios(): Promise<Usuario[]>{
        const response = await fetch(urlUser, {
            headers: {},
        })
        return response.json()
    } 
}