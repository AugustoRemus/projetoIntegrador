import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import apiRoutes from "./src/routes/apiRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();
const app = express();
apiRoutes(app);
userRoutes(app);

app.listen(3000, () => {
    console.log("servidor escutando");
});

