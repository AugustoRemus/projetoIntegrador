import fetch from 'node-fetch';
import db from '../database.js';
import { atualizaApiJob } from './requestModel.js';
import axios from 'axios';

//retorna uma API com ID
export async function encontrarApiModelo(id) {
  return await db.oneOrNone(
    'SELECT codigo, nome, descricao, url_base, freq_mon_min, data_cadastro FROM api WHERE codigo = $1;',
    [id]
  );
}

//retorna todas as API
export async function listarApisModelo() {
  return await db.query(`SELECT codigo, nome, descricao, url_base, freq_mon_min, data_cadastro FROM api;`);
}

//cadastra uma API
export async function cadastrarApiModelo(novaApi) {
  const dataCadastro = new Date(Date.now()).toISOString();
  return await db.one(
    'INSERT INTO api (nome, descricao, url_base, freq_mon_min, data_cadastro) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
    [novaApi.nome, novaApi.descricao, novaApi.url_base, novaApi.freq_mon_min, dataCadastro]
  );
}

//atualiza uma API
export async function atualizarApiModelo(id, valorAtualizado) {
  const api = await encontrarApiModelo(id);
  if (!api) throw new Error('API não encontrada');

  const { nome, descricao, url_base, freq_mon_min } = valorAtualizado;
  atualizaApiJob(id, freq_mon_min);
  return await db.one(
    'UPDATE api SET nome = $1, descricao = $2, url_base = $3, freq_mon_min = $4 WHERE codigo = $5 RETURNING *;',
    [nome, descricao, url_base, freq_mon_min, id]
  );
}

//exclui uma API
export async function excluirApiModelo(id) {
  return await db.none('DELETE FROM api WHERE codigo = $1;', [id]);
}

export async function verificaStatusModelo(id) {
  try {
    const resultado = await db.one(`SELECT url_base FROM api WHERE codigo  = $1`, [id]);
    const url = resultado.url_base;
    const response = await axios.get(url);
    return response.status;
  } catch (erro) {
    console.error(erro);
    return 'ERRO: URL INVÁLIDA';
  }
}
