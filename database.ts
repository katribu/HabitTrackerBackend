const { Pool } = require('pg')

const database = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'Habits',
        password: '100759094',
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

async function getHabitsByMonth(month:string) {
    const result = await database.query(`
    SELECT habits.habits as habit,
    days.days as day
    FROM 
    habits
    JOIN day_habits ON
    habits.habits = day_habits.habits
    JOIN months ON
    months.id = day_habits.month_id
    JOIN days ON
    days.days = day_habits.day_id
    WHERE months.month = $1
    ORDER BY days.days asc
    `,[month])

    const resultsArray = result.rows
    if(resultsArray.length === 0){
        return "This month has no habits registered"
    }
    else {
        return resultsArray
    }
}

async function registerHabit(habits:string, month: number, day: number ){
    const result = await database.query(`
    INSERT INTO day_habits
    (habits,month_id,day_id)
    VALUES ($1, $2, $3)
    `,[habits, month, day ]);

    return result.rows[0]
    
}

module.exports = {
    getHabitsByMonth,
    registerHabit,
    addNewHabit,
    getAllHabits
}