import express from 'express';
import {
  listarRequests,
  buscarRequestPorId,
  cadastrarRequest,
  atualizarRequest,
  excluirRequest,
  encontrarRequestPorApi,
  gerarRelatorio
} from '../controllers/requestController.js';

const requestRoutes = (app) => {
  app.use(express.json());

  app.get('/request', listarRequests);

  app.get('/request/:id', buscarRequestPorId);

  app.post('/request', cadastrarRequest);

  app.put('/request/:id', atualizarRequest);

  app.delete('/request/:id', excluirRequest);

  app.get('/request/api/:id', encontrarRequestPorApi);

  app.get('/relatorio/:id', gerarRelatorio);
};

export default requestRoutes;
