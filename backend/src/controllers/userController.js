import nodemailer from "nodemailer";
import { listarUsuariosModelo, encontrarUsuarioModelo, cadastrarUsuarioModelo, atualizarUsuarioModelo, excluirUsuarioModelo, filtrarUsuariosBase } from "../models/userModels.js";

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
    const atributo = req.params.atributo
    const valorAtualizado = req.body;

    try{
        const usuarioDesejado = await encontrarUsuarioModelo(id);
        if(!usuarioDesejado){
            res.status(404).json("Usuário não encontrado");
        } else {
            const usuarioAtualizado = await atualizarUsuarioModelo(id, valorAtualizado, atributo);
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

//lógica para enviar e-mail caso alguma api caia
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function enviarEmail(destinatario, assunto, mensagem) {
    try {
        await transporter.sendMail({
            from: '"Monitoramento de APIs" <seu.email@gmail.com>',
            to: destinatario,
            subject: assunto,
            text: mensagem,
        });
        console.log(`E-mail enviado para ${destinatario}`);
    } catch (error) {
        console.error(`Erro ao enviar e-mail para ${destinatario}:`, error.message);
    }
}

export async function notificarUsuarios(api) {
    const usuariosBase = filtrarUsuariosBase();

    for (const usuario of usuariosBase) {
        const mensagem = `
            Olá, ${usuario.nome},
                
            A API "${api.nome}" está fora do ar.
            URL Base: ${api.url_base}
            Descrição: ${api.desc}
                
            Por favor, tome as providências necessárias.
        `;

        await enviarEmail(usuario.email, `Alerta: API "${api.nome}" Inativa`, mensagem);
    }
}


