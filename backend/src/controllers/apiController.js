import { listarApisModelo, encontrarApiModelo, cadastrarApiModelo, atualizarApiModelo, excluirApiModelo, verificaStatusApiModelo } from "../models/apiModels.js";
import { notificarUsuarios } from "../models/userModels.js";

export async function listarApis (req, res) {
    try{
        const resultado = await listarApisModelo();
        res.status(200).json(resultado);
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
    
};

export async function listaApiPorId (req, res) {
    const id = req.params.id;

    try{
        const apiDesejada = await encontrarApiModelo(id);
        if(!apiDesejada){
            res.status(404).json("API não encontrada");
        } else {
            res.status(200).json(apiDesejada);
        }
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
};

export async function cadastrarApi(req, res) {
    const novaApi = req.body;

    try{
        const apiCadastrada = await cadastrarApiModelo(novaApi);
        res.status(201).json(apiCadastrada);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

};

//ainda não funciona
export async function atualizarApi(req, res){
    const id = req.params.id;
    const atributo = req.params.atributo
    const valorAtualizado = req.body;

    try{
        const apiDesejada = await encontrarApiModelo(id);
        if(!apiDesejada){
            res.status(404).json("API não encontrada");
        } else {
            const apiAtualizada = await atualizarApiModelo(id, valorAtualizado, atributo);
            res.status(200).json("API atualizada com sucesso" + apiAtualizada);
        }
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

export async function excluirApi(req, res){
    const id = req.params.id;

    try{
        const apiDesejada = await encontrarApiModelo(id);
        if(!apiDesejada){
            res.status(404).json("API não encontrada");
        } else {
            await excluirApiModelo(id);
            res.status(200).json("API excluída com sucesso" + apiDesejada);
        }
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

export async function verificaStatusApi(req, res){
    const id = req.params.id;

    try{
        const ativa = false;
        if(ativa){
            res.status(200).json({"Status": "API ativa"});
        } else {
            const apiInativa = encontrarApiModelo(id);
            res.status(200).json({"Status": "API fora do ar"});
            notificarUsuarios(apiInativa);
        }
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
    
};

