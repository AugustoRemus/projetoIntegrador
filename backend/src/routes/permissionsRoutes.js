import express from 'express';
import {
  listarPermissions,
  buscarPermissionPorId,
  cadastrarPermission,
  atualizarPermission,
  excluirPermission,
} from '../controllers/permissionsController.js';

const permissionsRoutes = (app) => {
  app.use(express.json());

  app.get('/permissao', listarPermissions);

  app.get('/permissao/:id', buscarPermissionPorId);

  app.post('/permissao', cadastrarPermission);

  app.put('/permissao/:id', atualizarPermission);

  app.delete('/permissao/:id', excluirPermission);
};

export default permissionsRoutes;
