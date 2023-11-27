// ./index.ts

import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

const PORT = 3001;

app.get('/healthy', (_req: Request, res: Response) => {
    res.status(200).send('the application is healthy')
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});