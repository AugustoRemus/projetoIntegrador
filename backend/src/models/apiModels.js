import fetch from 'node-fetch';
import { apis } from "../../data.js";

export async function encontrarApiModelo(id){
    return apis.find((api) => api.id == id);    
};

export async function listarApisModelo(){
    return apis;
};

export async function cadastrarApiModelo(novaApi) {
    apis.push(novaApi);
    return novaApi;
};

export async function atualizarApiModelo(id, valorAtualizado){
    let api = apis.find((api) => api.id == id);
    api = {...api, ...valorAtualizado};
    return api;
};

export async function excluirApiModelo(id) {
    apis.splice(id, 1)[0];
};

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




