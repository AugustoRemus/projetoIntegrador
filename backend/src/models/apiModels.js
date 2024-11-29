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

export async function atualizarApiModelo(id, valorAtualizado, atributo){
    const api = apis.find((api) => api.id == id);
    api[atributo] = valorAtualizado;
    return api;
};

export async function excluirApiModelo(id) {
    apis.splice(id, 1)[0];
};





