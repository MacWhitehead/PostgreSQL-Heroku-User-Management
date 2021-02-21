# PostgreSQL-Heroku-User-Management
To create the table with 10 example users, run these commands in the database attached to your heroku: 
create table users (
    id serial PRIMARY KEY, 
    first_name text, 
    last_name text, 
    email text UNIQUE NOT NULL, 
    age int
);
insert into users (first_name, last_name, email, age) values ('Carlotta', 'Whitear', 'cwhitear0@stanford.edu', 73);
insert into users (first_name, last_name, email, age) values ('Kristofer', 'Sieb', 'ksieb1@netscape.com', 26);
insert into users (first_name, last_name, email, age) values ('Feodora', 'Frape', 'ffrape2@tripod.com', 36);
insert into users (first_name, last_name, email, age) values ('Fayette', 'Ranscombe', 'franscombe3@youtu.be', 40);
insert into users (first_name, last_name, email, age) values ('Linette', 'Cadlock', 'lcadlock4@amazon.co.uk', 19);
insert into users (first_name, last_name, email, age) values ('Alana', 'Sheaber', 'asheaber5@simplemachines.org', 73);
insert into users (first_name, last_name, email, age) values ('Karolina', 'Chatt', 'kchatt6@liveinternet.ru', 52);
insert into users (first_name, last_name, email, age) values ('Ermengarde', 'Sketchley', 'esketchley7@newsvine.com', 35);
insert into users (first_name, last_name, email, age) values ('Ruddy', 'Genese', 'rgenese8@reddit.com', 50);
insert into users (first_name, last_name, email, age) values ('Shawn', 'Ruck', 'sruck9@google.com.br', 19);


To run the app, please run this command in the terminal: 
npm run dev

Then open this address in your browser on the port that logs in the terminal as listening:
localhost:port/