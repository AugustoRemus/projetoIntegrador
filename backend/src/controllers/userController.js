import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { listar, buscarPorId, criar, atualizar, excluir } from './utils.js';
import {
  listarUsuariosModelo,
  encontrarUsuarioModelo,
  cadastrarUsuarioModelo,
  atualizarUsuarioModelo,
  excluirUsuarioModelo,
  atualizarSenhaUsuarioModelo,
  buscarUsuarioLogin,
} from '../models/userModels.js';
import { checkHash, hash } from '../authentication.js';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: false, // usar SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function listarUsuarios(req, res) {
  try {
    const usuarios = await listarUsuariosModelo();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Erro: 'Falha na requisição' });
  }
}

export async function buscarUsuarioPorId(req, res) {
  try {
    const id = req.params.id;

    const usuario = await encontrarUsuarioModelo(id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ Erro: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Erro: 'Falha na requisição' });
  }
}

export async function cadastrarUsuario(req, res) {
  try {
    if (!req.body) {
      res.status(400).json({ Erro: 'Senha não informada ou dados inválidos' });
      return;
    }
    const senha = req.body.senha;
    const novoUsuario = req.body;

    if (!senha) {
      res.status(400).json({ Erro: 'Senha não informada' });
      return;
    }

    const usuario = await cadastrarUsuarioModelo(novoUsuario, hash(senha));

    const mensagem = `
    Seja bem-vindo, ${usuario.nome}!
    
    Você receberá alertas por esse endereço de e-mail a partir de agora.
    `;

    await enviarEmail(usuario.email, `${usuario.nome}, bem-vindo ao time!`, mensagem);

    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Erro: 'Falha na requisição' });
  }
}

export async function atualizarUsuario(req, res) {
  try {
    const id = req.params.id;
    const valoresAtualizados = req.body;
    const user = await atualizarUsuarioModelo(id, valoresAtualizados);

    const mensagem = `
        Olá, ${user.nome}!

        Sua conta foi atualizada e você receberá alertas neste e-mail a partir de agora.
        `;
    await enviarEmail(user.email, `Suas informações mudaram`, mensagem);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Erro: 'Falha na requisição' });
  }
}

export async function excluirUsuario(req, res) {
  try {
    const id = req.params.id;
    await excluirUsuarioModelo(id);
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Erro: 'Falha na requisição' });
  }
}

export async function autenticarUsuario(req, res) {
  const { login, senha } = req.body;

  try {
    const usuario = await buscarUsuarioLogin(login);
    const senhaCorreta = checkHash(senha, usuario.senha);

    if (senhaCorreta) {
      const token = await gerarTokenAcesso(usuario);
      res.status(200).json({ token: token, codigo: usuario.codigo, cargo: usuario.sigla_grupo });
    } else {
      res.status(401).json({ Erro: 'Usuário ou senha inválidos' });
    }
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: 'Falha na requisição' });
  }
}

export const tokenAutenticado = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json('Token não fornecido');
  }

  jwt.verify(token, process.env.SECRET_KEY, (erro, usuario) => {
    if (erro) {
      return res.status(403).json('Token inválido!');
    } else {
      req.usario = usuario;
      next();
    }
  });
};

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
    transporter.sendMail(opcoesEnvio, function (error, info) {
      if (error) {
        console.error('Erro:', error);
      } else {
        console.log('Email enviado:', info.response);
      }
    });
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${destinatario}:`, error.message);
  }
}

export async function notificarUsuarios(api, usuarios) {
  for (const usuario of usuarios) {
    const mensagem = `
            Olá, ${usuario.nome},
                
            A API "${api.nome}" está fora do ar.
            URL Base: ${api.url_base}
            Descrição: ${api.descricao}
                
            Por favor, tome as providências necessárias.
        `;

    await enviarEmail(usuario.email, `Alerta: API "${api.nome}" Inativa`, mensagem);
  }
}

export async function gerarTokenAcesso(usuario) {
  const token = jwt.sign(
    { id: usuario.codigo, login: usuario.login, grupo: usuario.sigla_grupo },
    process.env.SECRET_KEY,
    {
      expiresIn: '8h',
    }
  );

  return token;
}

export async function atualizarSenhaUsuario(req, res) {
  try {
    const id = req.params.id;
    const novaSenha = req.body.senha;

    if (!novaSenha) {
      res.status(400).json({ Erro: 'Senha não informada' });
      return;
    }

    await atualizarSenhaUsuarioModelo(id, hash(novaSenha));
    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Erro: 'Falha na requisição' });
  }
}
