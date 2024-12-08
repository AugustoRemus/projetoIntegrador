import express from 'express';
import {
  listarStatus,
  cadastrarStatus,
  atualizarStatus,
  excluirStatus,
  buscarStatusPorId,
} from '../controllers/statusController.js';

const statusRoutes = (app) => {
  app.use(express.json());

  app.get('/status', listarStatus);

  app.get('/status/:id', buscarStatusPorId);

  app.post('/status', cadastrarStatus);

  app.put('/status/:id', atualizarStatus);

  app.delete('/status/:id', excluirStatus);
};

export default statusRoutes;
