import express from "express";
import routesApi from "./src/routes/apiRoutes.js";

const app = express();
routesApi(app);

app.listen(3000, () => {
    console.log("servidor escutando");
});

