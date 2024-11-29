import { verificaStatusApiModelo } from "../models/requestModel.js";
import { encontrarApiModelo } from "../models/apiModels.js";

//verifica se a API está ativa
export async function verificaStatusApi(req, res){
    const id = req.params.id;

    try{
        const ativa = verificaStatusApiModelo(id);
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