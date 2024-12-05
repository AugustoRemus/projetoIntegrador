import { listarUsuarios, listarUsuarioPorId, cadastrarUsuario, atualizarUsuario, excluirUsuario, autenticarUsuario } from "../controllers/userController.js";
import express from "express";

const userRoutes = (app) => {
    app.use(express.json());

    app.get("/user", listarUsuarios);

    app.get("/user/:id", listarUsuarioPorId);

    app.post("/user", cadastrarUsuario);

    app.put("/user/:id", atualizarUsuario);

    app.delete("/user/:id", excluirUsuario);

    app.post("/login", autenticarUsuario);

};

export default userRoutes;