import "reflect-metadata"
import swaggerUI from 'swagger-ui-express'
import express, { Request, Response } from 'express';
import { MyPostgresDataSource } from './config/database';
import 'dotenv/config'
import router from './router/user.route';
import swaggerDocs from './config/paymentservice.json';

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

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get('/swagger.json', (_req, res) => res.send(swaggerDocs));

app.get('/healthy', (_req: Request, res: Response) => {
    res.status(200).send('the application is healthy')
});

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});