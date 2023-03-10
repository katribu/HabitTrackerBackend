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

create table day_habits (
ID serial primary key,
habit_id integer,
month_id integer,
day_id integer,
FOREIGN KEY (habit_id) REFERENCES habits (id),
FOREIGN KEY (month_id) REFERENCES months (id),
FOREIGN KEY (day_id) REFERENCES days (days)
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