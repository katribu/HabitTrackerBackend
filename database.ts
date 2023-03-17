const { Pool } = require('pg');
import dotenv from 'dotenv';
dotenv.config();

const database = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'Habits',
        password: process.env.DB_PSWD,
        port: 5432,
    })

async function addNewHabit(habit:string){
    const result = await database.query (`
    INSERT INTO habits (habits)
    VALUES ($1)
    `,[habit])

    return result.rows[0]
}

async function getAllHabits(){
    const result = await database.query (`
    SELECT habits
    FROM habits
    `)

    return result.rows
}


async function getHabitsByMonth(month:string){
    const result = await database.query (`
    SELECT day_habits.habits, 
    array_agg((day_habits.day_id)) as days,
    array_agg((day_habits.id)) as id
    FROM day_habits
    JOIN months ON
    months.id = day_habits.month_id
    WHERE months.month = $1
    GROUP BY day_habits.habits
`,[month])

    const resultsArray = result.rows
    return resultsArray
}

async function registerHabit(habits:string, month: number, day: number ){
    const result = await database.query(`
    INSERT INTO day_habits
    (habits,month_id,day_id)
    VALUES ($1, $2, $3)
    `,[habits, month, day ]);

    return result.rows[0]
    
}

async function deleteHabit(id:number){
    const result = await database.query(`
    DELETE FROM day_habits
    WHERE id = $1
    `,[id])

    return result.rows[0]
}

module.exports = {
    getHabitsByMonth,
    registerHabit,
    addNewHabit,
    getAllHabits,
    deleteHabit
}



