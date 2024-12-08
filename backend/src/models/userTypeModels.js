import db from '../database.js';

export async function encontrarUserTypeModelo(id) {
  return await db.oneOrNone('SELECT sigla, descricao FROM grupo WHERE sigla = $1;', [id]);
}

export async function listarUserTypesModelo() {
  return await db.query('SELECT sigla, descricao FROM grupo;');
}

export async function cadastrarUserTypeModelo(novoUserType) {
  return await db.oneOrNone('INSERT INTO grupo (sigla, descricao) VALUES ($1, $2) RETURNING *;', [
    novoUserType.sigla,
    novoUserType.descricao,
  ]);
}

export async function atualizarUserTypeModelo(id, valorAtualizado) {
  return await db.oneOrNone('UPDATE grupo SET descricao = $1 WHERE sigla = $2 RETURNING *;', [
    valorAtualizado.descricao,
    id,
  ]);
}

export async function excluirUserTypeModelo(id) {
  return await db.none('DELETE FROM grupo WHERE sigla = $1;', [id]);
}

export async function adicionarPermissaoCargoModelo(id, permissoes) {
  return await db.tx((tx) => {
    const adicionar = permissoes.map((permissao) => {
      return tx.none('INSERT INTO grupo_permissao (sigla_grupo, sigla_permissao) VALUES ($1, $2);', [id, permissao]);
    });

    return tx.batch(adicionar);
  });
}

export async function removerPermissaoCargoModelo(id, permissoes) {
  return await db.tx((tx) => {
    const remover = permissoes.map((permissao) => {
      return tx.none('DELETE FROM grupo_permissao WHERE sigla_grupo = $1 AND sigla_permissao = $2;', [id, permissao]);
    });

    return tx.batch(remover);
  });
}
