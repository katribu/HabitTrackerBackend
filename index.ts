import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors-ts'

dotenv.config();

const app: Express = express();
app.use(express.json())
app.use(cors())

const {getHabitsByMonth, registerHabit, addNewHabit, getAllHabits} = require('./database')

// const port = process.env.PORT;
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
    res.status(401).send({error:"This habit has already been registered for this day."})
  }

})

app.post('/add', async (req:Request, res: Response)=> {
  const {habit} = req.body
  try {
    await addNewHabit(habit)
    res.json({"message": `${habit} was successfully added to list.`})
  }catch(error:any){
  res.status(401).send({error:"This habit already exists"})
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});