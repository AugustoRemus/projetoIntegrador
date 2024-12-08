import {
  listarRequestsModelo,
  encontrarRequestModelo,
  cadastrarRequestModelo,
  atualizarRequestModelo,
  excluirRequestModelo,
  encontrarRequestApiModelo,
  gerarRelatorioModelo,
  gerarRelatorioGlobalModelo
} from '../models/requestModel.js';

export async function listarRequests(req, res) {
  try {
    const requests = await listarRequestsModelo();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function buscarRequestPorId(req, res) {
  try {
    const id = req.params.id;
    const request = await encontrarRequestModelo(id);
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json({ erro: 'Requisição não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function cadastrarRequest(req, res) {
  try {
    const novoRequest = req.body;
    const request = await cadastrarRequestModelo(novoRequest);
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function atualizarRequest(req, res) {
  try {
    const id = req.params.id;
    const valorAtualizado = req.body;
    const request = await atualizarRequestModelo(id, valorAtualizado);
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json({ erro: 'Requisição não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function excluirRequest(req, res) {
  try {
    const id = req.params.id;
    await excluirRequestModelo(id);
    res.status(200).json({ mensagem: 'Requisição excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function encontrarRequestPorApi(req, res) {
  try {
    const idApi = req.params.id;
    const requests = await encontrarRequestApiModelo(idApi);
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function gerarRelatorio(req, res){
  const id = req.params.id;
  try{
    const resultado = await gerarRelatorioModelo(id);
    res.status(200).send("Relatório criado");
  } catch(erro){
    console.log(erro);
    res.status(500).json({erro: 'Falha na requisição'});
  }
};

export async function gerarRelatorioGlobal(req, res){
  try{
    const resultado = await gerarRelatorioGlobalModelo();
    res.status(200).send("Relatório criado");
  } catch(erro){
    console.log(erro);
    res.status(500).json({erro: 'Falha na requisição'});
  }
};