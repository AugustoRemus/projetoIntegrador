import { listarUsuariosModelo, encontrarUsuarioModelo, cadastrarUsuarioModelo, atualizarUsuarioModelo, excluirUsuarioModelo } from "../models/userModels.js";

export async function listarUsuarios (req, res) {
    try{
        const resultado = await listarUsuariosModelo();
        res.status(200).json(resultado);
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
    
};

export async function listarUsuarioPorId (req, res) {
    const id = req.params.id;

    try{
        const usuarioDesejado = await encontrarUsuarioModelo(id);
        if(!usuarioDesejado){
            res.status(404).json("Usuário não encontrado");
        } else {
            res.status(200).json(usuarioDesejado);
        }
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
};

export async function cadastrarUsuario(req, res) {
    const novoUsuario = req.body;

    try{
        const usuarioCadastrado = await cadastrarUsuarioModelo(novoUsuario);
        res.status(201).json(usuarioCadastrado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

};

//ainda não funciona
export async function atualizarUsuario(req, res){
    const id = req.params.id;
    const valorAtualizado = req.body;

    try{
        const usuarioDesejado = await encontrarUsuarioModelo(id);
        if(!usuarioDesejado){
            res.status(404).json("Usuário não encontrado");
        } else {
            const usuarioAtualizado = await atualizarUsuarioModelo(id, valorAtualizado);
            res.status(200).json("Usuário atualizado com sucesso" + usuarioAtualizado);
        }
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

export async function excluirUsuario(req, res){
    const id = req.params.id;

    try{
        const usuarioDesejado = await encontrarUsuarioModelo(id);
        if(!usuarioDesejado){
            res.status(404).json("Usuário não encontrado");
        } else {
            await excluirUsuarioModelo(id);
            res.status(200).json("Usuário excluído com sucesso" + usuarioDesejado);
        }
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};




