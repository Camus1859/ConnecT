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
    inches INT,
    my_height_ft varchar(10),
    my_height_in  varchar(10)
);


CREATE TABLE searches (
    searches_id serial PRIMARY KEY,
    user_id INT,
    search_title varchar(255),
    encountered_time time,
    encountered_date date,
    encountered_latitude varchar(255),
    encountered_longitude varchar(255),
    encountered_persons_race varchar(255),
    encountered_persons_sex varchar(255),
    encountered_persons_height INT,
    encountered_persons_height_Ft varchar(255),
    encountered_persons_height_In varchar(255),
    match_found boolean,
    match_accepted boolean,

    FOREIGN KEY(user_id)
        REFERENCES users (user_id)
);
