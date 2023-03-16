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


async function getHabitsByMonth(month:string){
    const result = await database.query (`
    SELECT day_habits.habits, 
    array_agg((day_habits.day_id)) as days
    from day_habits
    JOIN months ON
    months.id = day_habits.month_id
    where months.month = $1
    group by day_habits.habits
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

module.exports = {
    getHabitsByMonth,
    registerHabit,
    addNewHabit,
    getAllHabits
}




// const Habits = [
//     January: {
//         Yoga: [
//             {id: 1, day: 1},
//             {id:2, day: 2}
//         ],
//         Spanish : [
//             {id: 3, day: 5},
//             {id: 8, day: 10}
//         ]
        
//     },
//     February: {
//         Yoga: [
//             {id: 1, day: 1},
//             {id:2, day: 2}
//         ],
//         Spanish : [
//             {id: 3, day: 5},
//             {id: 8, day: 10}
//         ]
//     }

// ]
