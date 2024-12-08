import {
  listarUserTypesModelo,
  encontrarUserTypeModelo,
  cadastrarUserTypeModelo,
  atualizarUserTypeModelo,
  excluirUserTypeModelo,
  adicionarPermissaoCargoModelo,
  removerPermissaoCargoModelo,
} from '../models/userTypeModels.js';

export async function listarUserTypes(req, res) {
  try {
    const userTypes = await listarUserTypesModelo();
    res.json(userTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function adicionarPermissaoCargo(req, res) {
  try {
    const sigla = req.params.id;
    const permissoes = req.body.permissoes;
    await adicionarPermissaoCargoModelo(sigla, permissoes);
    res.status(200).json({ mensagem: 'Permissões adicionadas com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function removerPermissaoCargo(req, res) {
  try {
    const sigla = req.params.id;
    const permissoes = req.body.permissoes;
    await removerPermissaoCargoModelo(sigla, permissoes);
    res.status(200).json({ mensagem: 'Permissões removidas com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function buscarUserTypePorId(req, res) {
  try {
    const sigla = req.params.id;
    const userType = await encontrarUserTypeModelo(sigla);
    if (userType) {
      res.json(userType);
    } else {
      res.status(404).json({ erro: 'Cargo não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function cadastrarUserType(req, res) {
  try {
    const novoUserType = req.body;
    const userType = await cadastrarUserTypeModelo(novoUserType);
    res.status(201).json(userType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function atualizarUserType(req, res) {
  try {
    const sigla = req.params.id;
    const valorAtualizado = req.body;
    const userType = await atualizarUserTypeModelo(sigla, valorAtualizado);
    if (userType) {
      res.json(userType);
    } else {
      res.status(404).json({ erro: 'Cargo não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}

export async function excluirUserType(req, res) {
  try {
    const sigla = req.params.id;
    await excluirUserTypeModelo(sigla);
    res.status(200).json({ mensagem: 'Cargo excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha na requisição' });
  }
}
