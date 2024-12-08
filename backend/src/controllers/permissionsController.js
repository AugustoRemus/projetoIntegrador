import {
  listarPermissionsModelo,
  encontrarPermissionModelo,
  cadastrarPermissionModelo,
  atualizarPermissionModelo,
  excluirPermissionModelo,
} from '../models/permissionsModels.js';

export async function listarPermissions(req, res) {
  try {
    const permissions = await listarPermissionsModelo();
    res.status(200).json(permissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function buscarPermissionPorId(req, res) {
  try {
    const id = req.params.id;
    const permission = await encontrarPermissionModelo(id);
    if (permission) {
      res.status(200).json(permission);
    } else {
      res.status(404).json({ erro: 'Permissão não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function cadastrarPermission(req, res) {
  try {
    const novaPermission = req.body;
    const permission = await cadastrarPermissionModelo(novaPermission);
    res.status(201).json(permission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function atualizarPermission(req, res) {
  try {
    const id = req.params.id;
    const valorAtualizado = req.body;
    const permission = await atualizarPermissionModelo(id, valorAtualizado);
    if (permission) {
      res.status(200).json(permission);
    } else {
      res.status(404).json({ erro: 'Permissão não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function excluirPermission(req, res) {
  try {
    const id = req.params.id;
    await excluirPermissionModelo(id);
    res.status(200).json({ mensagem: 'Permissão excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}
