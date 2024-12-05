import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { listarUsuariosModelo, encontrarUsuarioModelo, cadastrarUsuarioModelo, atualizarUsuarioModelo, excluirUsuarioModelo, autenticarUsuarioModelo, gerarTokenAcesso } from "../models/userModels.js";

dotenv.config();

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

export async function autenticarUsuario(req, res) {
    const {login, senha} = req.body;

    try{
        const usuario = autenticarUsuarioModelo(login, senha);

        if(usuario){
            const token = await gerarTokenAcesso(usuario);
            res.status(201).json({message: token});
        } else {
            res.status(401).json({"Erro": "Usuário ou senha inválidos"});
        }
    } catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
   
};

export const tokenAutenticado = (req, res, next ) => {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).json("Token não fornecido");
    }

    jwt.verify(token, process.env.SECRET_KEY, (erro, usuario) => {
        if(erro){
            return res.status(403).json("Token inválido!");
        } else {
            req.usario = usuario;
            next();
        }
    }); 
}; 



