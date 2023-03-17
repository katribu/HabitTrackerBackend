CREATE table habits (
ID SERIAL primary key,
habit text not null
);

INSERT INTO habits (habit)
VALUES ('yoga'),('alcohol'),('bm');

select *
from habits


create table months (
ID serial primary key,
month text not null
);

insert into months (month)
values
('January'),
('February'),
('March'),
('April'), ('May'),('June'),('July'),
('August'), ('September'),('October'),
('November'),('December');

select *
from months

create table Days (
days integer unique primary key
);

insert into Days (days)
values
(1), (2), (3), (4), (5), (6), (7),
(8), (9), (10), (11), (12), (13), (14),
(15), (16), (17), (18), (19), (20), (21),
(22), (23), (24), (25), (26), (27), (28),
(29), (30), (31);

--Added the unique restaint at the bottom so every row needs to be different
--(ie. every day can only have one habit. No duplicates)
create table day_habits (
ID serial primary key,
habits text,
month_id integer,
day_id integer,
FOREIGN KEY (habits) REFERENCES habits (habits),
FOREIGN KEY (month_id) REFERENCES months (id),
FOREIGN KEY (day_id) REFERENCES days (days),
UNIQUE (habits, month_id,day_id)
);

insert into day_habits (habit_id,month_id,day_id)
values (1,3,10),
(2,3,10),
(1,3,9);

select * from day_habits

select habits.habit as habit, months.month as month
FROM 
habits
JOIN day_habits ON
habits.id = day_habits.habit_id
JOIN months ON
months.id = day_habits.month_id
WHERE habits.habit = 'yoga';


-- Combining two rows into an array
SELECT habits,month_id, array_agg((id,day_id)) as days
from day_habits
group by habits, month_id

--get habits by months, with days and ids combinted in array
SELECT months.month,day_habits.habits, day_habits.month_id, 
array_agg((day_habits.id,day_habits.day_id)) as days
from day_habits
JOIN months ON
    months.id = day_habits.month_id
where months.month = 'January'
group by months.month,day_habits.habits, day_habits.month_id

-- Another version, with fewer columns
SELECT day_habits.habits, 
array_agg((day_habits.day_id)) as days
from day_habits
JOIN months ON
    months.id = day_habits.month_id
where months.month = 'January'
group by day_habits.habits

--get habits by month where they are in json format.
SELECT months.month,day_habits.habits, day_habits.month_id, 
json_agg(json_build_object(
'id',day_habits.id,
'day',day_habits.day_id
)) as days
from day_habits
JOIN months ON
    months.id = day_habits.month_id
where months.month = 'January'
group by months.month,day_habits.habits, day_habits.month_id

--delete a habit by id
DELETE from day_habits
WHERE id=1

