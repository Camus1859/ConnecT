CREATE DATABASE connect;

CREATE TABLE users (
    user_id serial PRIMARY KEY,
    firstName varchar(255),
    lastName varchar(255),
    user_name varchar(255) UNIQUE,
    img varchar(255),
    password varchar(255),
    bio varchar(1000)
);

CREATE TABLE addresses (
    address_id serial PRIMARY KEY,
    latitude INT,
    longitude INT
);

CREATE TABLE  demographics (
    demographic_id serial PRIMARY KEY,
    sex varchar,
    race varchar
);

CREATE TABLE times (
    time_id serial PRIMARY KEY,
    time time,
    date date
);

CREATE TABLE heights (
    height_id serial PRIMARY KEY,
    inches INT
);

CREATE TABLE searches (
    searches_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    time_id INT NOT NULL,
    height_id INT NOT NULL,

    FOREIGN KEY(user_id)
        REFERENCES users (user_id),

    FOREIGN KEY(address_id)
        REFERENCES addresses (address_id),

    FOREIGN KEY(time_id)
        REFERENCES times (time_id),

    FOREIGN KEY(height_id)
        REFERENCES heights (height_id)
);


