import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors-ts'

dotenv.config();

const app: Express = express();
app.use(express.json())
app.use(cors())

const {getHabitsByMonth, registerHabit, addNewHabit, getAllHabits, deleteHabit} = require('./database')

const port = 3333;

app.get('/habits', async (req: Request, res: Response)=> {
  const result = await getAllHabits()
  res.send(result)

})

app.get('/:month', async (req: Request, res: Response) => {
  const {month} = req.params;
  try{
    const results = await getHabitsByMonth(month)
    if(!results){
      res.send({error: "This month has no habits registered"})
      return;
    }
    res.json(results);
  }catch(error:any){
    res.status(401).send({ error: error.message})
  }
});



app.post('/registerhabit', async (req: Request, res: Response) => {
  const {habits, month, day} = req.body

  try{
    await registerHabit(habits, month, day)
    res.json({"message": "Habit registered successfully"})
  }catch (error: any) {
    res.status(401).send({error:error.message})
  }

})

app.post('/add', async (req:Request, res: Response)=> {
  const {habit} = req.body
  try {
    await addNewHabit(habit)
    res.json({"message": `${habit} was successfully added to list.`})
  }catch(error:unknown){
  res.status(401).send({error:"This habit already exists"})
  }
})

app.delete('/delete/:id', async (req:Request, res: Response) => {
  const {id} = req.params
  try{
    await deleteHabit(id)
    res.json({"message": `Habit with id ${id} was deleted`})
  }catch(error:unknown){
    res.status(401).send({error:"This habit already exists"})
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});