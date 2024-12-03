import express from "express";
import { listarApis, listaApiPorId, cadastrarApi, atualizarApi, excluirApi, verificaStatusApi } from "../controllers/apiController.js";

const apiRoutes = (app) => {
    app.use(express.json());

    app.get("/api", listarApis);

    app.get("/api/:id", listaApiPorId);

    app.post("/api", cadastrarApi);

    app.put("/api/:id/", atualizarApi);

    app.delete("/api/:id", excluirApi);

    app.get("/api/status/:id", verificaStatusApi);

};

export default apiRoutes;