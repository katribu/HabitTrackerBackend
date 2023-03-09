import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// const port = process.env.PORT;
const port = 3333;

app.get('/', (req: Request, res: Response) => {
  res.send('This works!!!');
});

app.post('/newHabit', (req: Request, res: Response) => {
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});