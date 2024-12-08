import express from 'express';
import { autenticarUsuario, cadastrarUsuario } from '../controllers/userController.js';

const publicRoutes = (app) => {
  app.use(express.json());

  app.post('/login', autenticarUsuario);
  app.post('/user', cadastrarUsuario);
};

export default publicRoutes;
