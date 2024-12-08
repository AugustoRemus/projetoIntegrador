import dotenv from 'dotenv';
import db from '../database.js';

dotenv.config();

export async function encontrarUsuarioModelo(id) {
  return await db.oneOrNone(
    'SELECT codigo, nome, email, telefone, login, sigla_grupo FROM usuario WHERE codigo = $1;',
    id
  );
}

export async function listarUsuariosModelo() {
  return await db.query('SELECT codigo, nome, email, telefone, login, sigla_grupo FROM usuario;');
}

export async function cadastrarUsuarioModelo(novoUsuario, senha) {
  return await db.oneOrNone(
    'INSERT INTO usuario (nome, email, telefone, login, senha, sigla_grupo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING codigo, nome, email, telefone, login, sigla_grupo;',
    [novoUsuario.nome, novoUsuario.email, novoUsuario.telefone, novoUsuario.login, senha, novoUsuario.sigla_grupo]
  );
}

export async function atualizarUsuarioModelo(id, valoresAtualizados) {
  return await db.oneOrNone(
    'UPDATE usuario SET nome = $1, email = $2, telefone = $3, login = $4, sigla_grupo = $5 WHERE codigo = $6 RETURNING codigo, nome, email, telefone, login, sigla_grupo;',
    [
      valoresAtualizados.nome,
      valoresAtualizados.email,
      valoresAtualizados.telefone,
      valoresAtualizados.login,
      valoresAtualizados.sigla_grupo,
      id,
    ]
  );
}

export async function atualizarSenhaUsuarioModelo(id, novaSenha) {
  return await db.none('UPDATE usuario SET senha = $1 WHERE codigo = $2;', [novaSenha, id]);
}

export async function excluirUsuarioModelo(id) {
  return await db.none('DELETE FROM usuario WHERE codigo = $1;', id);
}

export async function buscarUsuarioLogin(login) {
  return await db.oneOrNone(
    'SELECT codigo, nome, email, telefone, login, sigla_grupo, senha FROM usuario WHERE login = $1;',
    [login]
  );
}
