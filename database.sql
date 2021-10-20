CREATE DATABASE connect;

CREATE TABLE users (
    user_id serial PRIMARY KEY,
    firstName varchar(255),
    lastName varchar(255),
    user_name varchar(255) UNIQUE,
    img varchar(255),
    password varchar(255),
    bio varchar(1000),
    sex varchar,
    race varchar,
    inches INT

);


CREATE TABLE searches (
    searches_id serial PRIMARY KEY,
    user_id INT,
    encountered_time time,
    encountered_date date,
    encountered_latitude INT,
    encountered_longitude INT,
    encountered_persons_race varchar,
    encountered_persons_sex varchar,
    encountered_persons_height INT,
    match_found boolean,
    match_accepted boolean,

    FOREIGN KEY(user_id)
        REFERENCES users (user_id)
);
