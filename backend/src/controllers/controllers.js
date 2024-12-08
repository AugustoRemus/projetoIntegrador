function tratarErro(res, erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
};

async function verificarExistencia(id, modelo, res) {
    const recurso = await modelo(id);
    if (!recurso) {
        res.status(404).json({ mensagem: "Recurso não encontrado" });
        return null;
    }
    return recurso;
};


export async function listar(req, res, modelo) {
    try {
        const resultado = await modelo();
        res.status(200).json(resultado);
    } catch (erro) {
        tratarErro(res, erro);
    }
}

export async function buscarPorId(req, res, encontrarModelo) {
    const id = req.params.id;
    try {
        const recurso = await verificarExistencia(id, encontrarModelo, res);
        if (recurso) res.status(200).json(recurso);
    } catch (erro) {
        tratarErro(res, erro);
    }
}

export async function criar(req, res, modelo) {
    const dados = req.body;
    try {
        const criado = await modelo(dados);
        res.status(201).json(criado);
    } catch (erro) {
        tratarErro(res, erro);
    }
}

export async function atualizar(req, res, encontrarModelo, atualizarModelo) {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    try {
        const recurso = await verificarExistencia(id, encontrarModelo, res);
        if (recurso) {
            const atualizado = await atualizarModelo(id, dadosAtualizados);
            res.status(200).json({ mensagem: "Atualizado com sucesso", atualizado });
        }
    } catch (erro) {
        tratarErro(res, erro);
    }
}

export async function excluir(req, res, encontrarModelo, excluirModelo) {
    const id = req.params.id;
    try {
        const recurso = await verificarExistencia(id, encontrarModelo, res);
        if (recurso) {
            await excluirModelo(id);
            res.status(200).json({ mensagem: "Excluído com sucesso" });
        }
    } catch (erro) {
        tratarErro(res, erro);
    }
}
