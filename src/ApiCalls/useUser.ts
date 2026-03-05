import type { Usuario } from "@/models/Usuario";
import { useConstants } from "@/stores/Constants";

const { ApiUrl} = useConstants()


export const useUser = () => {
    const urlUser = ApiUrl +'/Usuario'

    function getUsuarios(): Usuario[]{
        const header : any = {}
        

        let usuarios = await fetch(urlUser,{
            headers: {

            }
        }) 

    } 
}