// dbModel.js
export async function buscarPorId(colecao, id) {
    return colecao.find((item) => item.id == id);
};

export async function listarTodos(colecao) {
    return colecao;
};

export async function criar(colecao, novoItem) {
    colecao.push(novoItem);
    return novoItem;
};

export async function atualizar(colecao, id, valoresAtualizados) {
    const indice = colecao.findIndex((item) => item.id == id);
    if (indice === -1) return null;

    const itemAntigo = { ...colecao[indice] };
    const itemAtualizado = { ...itemAntigo, ...valoresAtualizados };
    colecao[indice] = itemAtualizado;

    return { itemAntigo, itemAtualizado };
};

export async function excluir(colecao, id) {
    const indice = colecao.findIndex((item) => item.id == id);
    if (indice === -1) return null;

    return colecao.splice(indice, 1)[0];
};
