import "reflect-metadata"
import swaggerUI from 'swagger-ui-express'
import express, { Request, Response } from 'express';
import { MyPostgresDataSource } from './config/database';
import { swaggerConfig } from '../src/config/swagger';
import swaggerJSDoc from "swagger-jsdoc";
import 'dotenv/config'
import router from './router/user.route';

MyPostgresDataSource.initialize()
  .then(() => {
    console.log('Database initialized!');
  })
  .catch((err) => {
    console.error('Database Error: ', err);
  });

const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/swagger.json', (_req, res) => res.send(swaggerSpec));

app.get('/healthy', (_req: Request, res: Response) => {
    res.status(200).send('the application is healthy')
});

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});