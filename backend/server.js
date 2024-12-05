import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./src/routes/apiRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
/*import userTypeRoutes from "./src/routes/userTypeRoutes.js";
import permissionsRoutes from "./src/routes/permissionsRoutes.js";
import statusRoutes from "./src/routes/statusRoutes.js";*/

dotenv.config();
const app = express();

apiRoutes(app);
userRoutes(app);
/*userTypeRoutes(app);
permissionsRoutes(app);
statusRoutes(app);*/

app.listen(3000, () => {
    console.log("servidor escutando");
});

