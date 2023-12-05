import "reflect-metadata"
import express, { Request, Response } from 'express';
import { MyPostgresDataSource } from './config/database';
import 'dotenv/config'

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

app.get('/healthy', (_req: Request, res: Response) => {
    res.status(200).send('the application is healthy')
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});