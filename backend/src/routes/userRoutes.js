import {
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
  atualizarSenhaUsuario,
  cadastrarUsuario,
} from '../controllers/userController.js';
import express from 'express';

const userRoutes = (app) => {
  app.use(express.json());

  app.get('/user', listarUsuarios);

  app.get('/user/:id', buscarUsuarioPorId);

  app.post('/user', cadastrarUsuario);

  app.put('/user/:id', atualizarUsuario);

  app.delete('/user/:id', excluirUsuario);

  app.put('/user/senha/:id', atualizarSenhaUsuario);
};

export default userRoutes;
