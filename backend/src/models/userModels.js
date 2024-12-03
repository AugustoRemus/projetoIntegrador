import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { users } from "../../data.js";
dotenv.config();

export async function encontrarUsuarioModelo(id){
    return users.find((user) => user.id == id);    
};

export async function listarUsuariosModelo(){
    return users;
};

export async function cadastrarUsuarioModelo(novoUsuario) {
    users.push(novoUsuario);
    const mensagem =`
    Seja bem-vindo, ${novoUsuario.nome}!

    Você receberá alertas por esse endereço de e-mail a partir de agora.
    `;
    await enviarEmail(novoUsuario.email, `${novoUsuario.nome}, bem-vindo ao time!`, mensagem);
    return novoUsuario;
};

export async function atualizarUsuarioModelo(id, valorAtualizado){
    let user = encontrarUsuarioModelo(id);
    const userAntigo = {...user};
    user = {...user, ...valorAtualizado};

    const emailNovo = user.email?.trim().toLowerCase();
    const emailAntigo = userAntigo.email?.trim().toLowerCase();
    
    if(emailAntigo !== emailNovo){
        const mensagem =`
        Olá, ${user.nome}!

        Você receberá alertas por esse endereço de e-mail a partir de agora.
        `;
    await enviarEmail(user.email, `Confirmação de novo endereço de e-mail`, mensagem);
    }

    return user;
};

export async function excluirUsuarioModelo(id) {
    users.splice(id, 1)[0];
};

export function filtrarUsuariosBase(){
    return users.filter(user => user.tipo == "BS");
};

//lógica para enviar e-mail caso alguma api caia
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    secure: false, // usar SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function enviarEmail(destinatario, assunto, mensagem) {
    try {
        //configura o objeto
        const opcoesEnvio = {
            from: 'Monitor de API lauramesquitabruel@gmail.com',
            to: destinatario,
            subject: assunto,
            text: mensagem,
        };
        //envia o email
        transporter.sendMail(opcoesEnvio, function(error, info){
            if(error){
                console.error("Erro:", error);
            } else {
                console.log("Email enviado:", info.response);
            }
        })
    } catch (error) {
        console.error(`Erro ao enviar e-mail para ${destinatario}:`, error.message);
    }
};

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
};
