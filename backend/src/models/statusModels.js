import db from '../database.js';

export async function encontrarStatusModelo(id) {
  return await db.oneOrNone('SELECT codigo, descricao FROM status WHERE codigo = $1;', [id]);
}

export async function listarStatusModelo() {
  return await db.query('SELECT codigo, descricao FROM status;');
}

export async function cadastrarStatusModelo(novoStatus) {
  return await db.one('INSERT INTO status (codigo, descricao) VALUES ($1, $2) RETURNING *;', [
    novoStatus.codigo,
    novoStatus.descricao,
  ]);
}

export async function atualizarStatusModelo(id, valorAtualizado) {
  const status = await encontrarStatusModelo(id);
  if (!status) throw new Error('Status não encontrado');

  const { descricao } = valorAtualizado;
  return await db.one('UPDATE status SET descricao = $1 WHERE codigo = $2 RETURNING *;', [descricao, id]);
}

export async function excluirStatusModelo(id) {
  return await db.none('DELETE FROM status WHERE codigo = $1;', [id]);
}
