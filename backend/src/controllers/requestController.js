export async function listarRequisicoes (req, res) {
    try{
        const resultado = await listarRequisicoesModelo();
        res.status(200).json(resultado);
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
    
};

export async function cadastrarRequisicao(req, res) {
    const novaRequisicao = req.body;
    try{
        const requisicaoCadastrada = await cadastrarRequisicaoModelo(novaRequisicao);
        res.status(201).json(requisicaoCadastrada);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

};

export async function atualizarRequisicao(req, res){
    const id = req.params.id;
    const valorAtualizado = req.body;

    try{
        const requisicaoDesejada = await encontrarRequisicaoModelo(id);
        if(!requisicaoDesejada){
            res.status(404).json("Requisição não encontrada");
        } else {
            const reqAtualizada = await atualizarRequisicaoModelo(id, valorAtualizado);
            res.status(200).json("Requisição atualizada com sucesso" + reqAtualizada);
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