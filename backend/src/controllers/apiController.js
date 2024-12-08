import {
  listarApisModelo,
  encontrarApiModelo,
  cadastrarApiModelo,
  atualizarApiModelo,
  excluirApiModelo,
  verificaStatusModelo
} from '../models/apiModels.js';

export async function listarApis(req, res) {
  try {
    const apis = await listarApisModelo();
    res.status(200).json(apis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function buscarApiPorId(req, res) {
  try {
    const id = req.params.id;
    const api = await encontrarApiModelo(id);
    if (api) {
      res.status(200).json(api);
    } else {
      res.status(404).json({ erro: 'API não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function cadastrarApi(req, res) {
  try {
    const novaApi = req.body;
    const api = await cadastrarApiModelo(novaApi);
    res.status(201).json(api);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function atualizarApi(req, res) {
  try {
    const id = req.params.id;
    const valorAtualizado = req.body;
    const api = await atualizarApiModelo(id, valorAtualizado);
    if (api) {
      res.status(200).json(api);
    } else {
      res.status(404).json({ erro: 'API não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function excluirApi(req, res) {
  try {
    const id = req.params.id;
    await excluirApiModelo(id);
    res.status(200).json({ mensagem: 'API excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function verificaStatus(req, res) {
  try{
    const id = req.params.id
    const status = await verificaStatusModelo(id);
    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

