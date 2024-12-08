import {
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
  atualizarSenhaUsuario,
} from '../controllers/userController.js';
import express from 'express';

const userRoutes = (app) => {
  app.use(express.json());

  app.get('/user', listarUsuarios);

  app.get('/user/:id', buscarUsuarioPorId);

  app.put('/user/:id', atualizarUsuario);

  app.delete('/user/:id', excluirUsuario);

  app.put('/user/senha/:id', atualizarSenhaUsuario);
};

export default userRoutes;
