import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(express.json())

const {getHabitsByMonth, registerHabit} = require('./database')

// const port = process.env.PORT;
const port = 3333;

app.get('/:month', async (req: Request, res: Response) => {
  const {month} = req.params;
  try{
    const results = await getHabitsByMonth(month)
    if(!results){
      res.status(401).send({error: "This month has no habits registered"})
      return;
    }
    res.json(results);
  }catch(error:any){
    res.status(401).send({ error: error.message})
  }
});



app.post('/registerhabit', async (req: Request, res: Response) => {
  const {habit, month, day} = req.body

  try{
    await registerHabit(habit, month, day)
    res.json({"message": "Habit registered successfully"})
  }catch (error: any) {
    res.status(401).send({error:error.message})
  }

})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});