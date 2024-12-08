import { listar, buscarPorId, atualizar, excluir, criar } from './utils.js';
import {
  listarStatusModelo,
  encontrarStatusModelo,
  cadastrarStatusModelo,
  atualizarStatusModelo,
  excluirStatusModelo,
} from '../models/statusModels.js';

export async function listarStatus(req, res) {
  try {
    const status = await listarStatusModelo();
    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function buscarStatusPorId(req, res) {
  try {
    const id = req.params.id;
    const status = await encontrarStatusModelo(id);
    if (status) {
      res.status(200).json(status);
    } else {
      res.status(404).json({ erro: 'Status não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function cadastrarStatus(req, res) {
  try {
    const novoStatus = req.body;
    const status = await cadastrarStatusModelo(novoStatus);
    res.status(201).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function atualizarStatus(req, res) {
  try {
    const id = req.params.id;
    const valorAtualizado = req.body;
    const status = await atualizarStatusModelo(id, valorAtualizado);
    if (status) {
      res.status(200).json(status);
    } else {
      res.status(404).json({ erro: 'Status não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function excluirStatus(req, res) {
  try {
    const id = req.params.id;
    await excluirStatusModelo(id);
    res.status(200).json({ mensagem: 'Status excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}
