import express from 'express';
import {
  listarUserTypes,
  cadastrarUserType,
  atualizarUserType,
  excluirUserType,
  buscarUserTypePorId,
  adicionarPermissaoCargo,
  removerPermissaoCargo,
} from '../controllers/userTypeController.js';

const userTypeRoutes = (app) => {
  app.use(express.json());

  app.get('/cargo', listarUserTypes);

  app.get('/cargo/:id', buscarUserTypePorId);

  app.post('/cargo', cadastrarUserType);

  app.put('/cargo/:id', atualizarUserType);

  app.delete('/cargo/:id', excluirUserType);

  app.post('/cargo/add/:id', adicionarPermissaoCargo);

  app.post('/cargo/remove/:id', removerPermissaoCargo);
};

export default userTypeRoutes;
