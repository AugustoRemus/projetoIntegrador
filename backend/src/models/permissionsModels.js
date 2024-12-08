import db from '../database.js';

export async function encontrarPermissionModelo(id) {
  return await db.oneOrNone('SELECT sigla, descricao FROM permissao WHERE sigla = $1;', [id]);
}

export async function listarPermissionsModelo() {
  return await db.query('SELECT sigla, descricao FROM permissao;');
}

export async function cadastrarPermissionModelo(novaPermission) {
  return await db.oneOrNone('INSERT INTO permissao (sigla, descricao) VALUES ($1, $2) RETURNING sigla, descricao;', [
    novaPermission.sigla,
    novaPermission.descricao,
  ]);
}

export async function atualizarPermissionModelo(id, valorAtualizado) {
  return await db.oneOrNone('UPDATE permissao SET descricao = $1 WHERE sigla = $2 RETURNING sigla, descricao;', [
    valorAtualizado.descricao,
    id,
  ]);
}

export async function excluirPermissionModelo(id) {
  return await db.none('DELETE FROM permissao WHERE sigla = $1;', [id]);
}
