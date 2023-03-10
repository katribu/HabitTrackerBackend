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
    INSERT INTO habits (habit)
    VALUES ($1)
    `,[habit])

    return result.rows[0]
}

async function getAllHabits(){
    const result = await database.query (`
    SELECT *
    FROM habits
    `)

    return result.rows
}

async function getHabitsByMonth(month:string) {
    const result = await database.query(`
    SELECT habits.habit as habit,
    days.days as day
    FROM 
    habits
    JOIN day_habits ON
    habits.id = day_habits.habit_id
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

async function registerHabit(habit:number, month: number, day: number ){
    const result = await database.query(`
    INSERT INTO day_habits
    (habit_id,month_id,day_id)
    VALUES ($1, $2, $3)
    `,[habit, month, day ]);

    const registeredHabit = result.rows[0]
    if(habit && month && day){
        return `This habit has already been registered for this month and day.`
    }else {
        return registeredHabit;
    }

}

module.exports = {
    getHabitsByMonth,
    registerHabit,
    addNewHabit,
    getAllHabits
}