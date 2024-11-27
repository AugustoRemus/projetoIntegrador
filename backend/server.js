import express from "express";
import routesApi from "./src/routes/apiRoutes.js";
import apiRoutes from "./src/routes/apiRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();
apiRoutes(app);
userRoutes(app);

app.listen(3000, () => {
    console.log("servidor escutando");
});

