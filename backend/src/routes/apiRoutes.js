import express from 'express';
import {
  listarApis,
  buscarApiPorId,
  cadastrarApi,
  atualizarApi,
  excluirApi,
  verificaStatus
} from '../controllers/apiController.js';
import { tokenAutenticado } from '../controllers/userController.js';

const apiRoutes = (app) => {
  app.use(express.json());

  app.get('/api', listarApis);

  app.get('/api/:id', buscarApiPorId);

  app.post('/api', cadastrarApi);

  app.put('/api/:id/', atualizarApi);

  app.delete('/api/:id', excluirApi);

  app.get('/api/status/:id', verificaStatus);

};

export default apiRoutes;
