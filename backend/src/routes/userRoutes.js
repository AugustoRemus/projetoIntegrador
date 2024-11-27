import { listarUsuarios, listarUsuarioPorId, cadastrarUsuario, atualizarUsuario, excluirUsuario } from "../controllers/userController.js";
import express from "express";

const userRoutes = (app) => {
    app.use(express.json());

    app.get("/user", listarUsuarios);

    app.get("/user/:id", listarUsuarioPorId);

    app.post("/user", cadastrarUsuario);

    app.put("/user/:id/:atributo", atualizarUsuario);

    app.delete("/user/:id", excluirUsuario);
};

export default userRoutes;