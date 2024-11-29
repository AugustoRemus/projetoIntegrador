import { encontrarApiModelo } from "./apiModels.js";

export async function verificaStatusApiModelo(id){
    apiDesejada = encontrarApiModelo(id);
    try{
        const url = apiDesejada.url_base;
        const resposta = await fetch(url);
        return resposta.ok;
    } catch(erro) {
        console.error(erro.message);
        return false;
    }
};