import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes.js';
import userRoutes from './routes/userRoutes.js';
import userTypeRoutes from './routes/userTypeRoutes.js';
import permissionsRoutes from './routes/permissionsRoutes.js';
import statusRoutes from './routes/statusRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import cors from 'cors';
import { iniciarJobs } from './models/requestModel.js';
import publicRoutes from './routes/publicRoutes.js';
import { autenticarUsuario } from './controllers/userController.js';

dotenv.config();
const app = express();

app.use(cors());
publicRoutes(app);

apiRoutes(app);
userRoutes(app);
userTypeRoutes(app);
permissionsRoutes(app);
statusRoutes(app);
requestRoutes(app);

iniciarJobs();

app.listen(3000, () => {
  console.log('servidor escutando');
});
