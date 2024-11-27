import express from "express";
import { listarApis, listaApiPorId, cadastrarApi, atualizarApi, excluirApi } from "../controllers/apiController.js";

const routesApi = (app) => {
    app.use(express.json());

    app.get("/api", listarApis);

    app.get("/api/:id", listaApiPorId);

    app.post("/api", cadastrarApi);

    app.put("/api/:id/:atributo", atualizarApi);

    app.delete("/api/:id", excluirApi);
};

export default routesApi;