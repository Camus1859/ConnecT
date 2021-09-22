CREATE DATABASE connect;

CREATE TABLE users (
    user_id INT NOT NULL,
    firstName varchar(255),
    lastName varchar(255),
    img varchar(255),
    passwords varchar(255),
    bio varchar(1000),
    PRIMARY KEY(user_id)
);

CREATE TABLE addresses (
    address_id INT NOT NULL,
    latitude INT,
    longitude INT,
    PRIMARY KEY(address_id)
);

CREATE TABLE   demographics (
    demographic_id INT NOT NULL,
    sex varchar,
    race varchar,
    PRIMARY KEY(demographic_id)
);

CREATE TABLE times (
    time_id INT NOT NULL,
    time time,
    date date,
    PRIMARY KEY(time_id)
);

CREATE TABLE heights (
    height_id INT NOT NULL,
    inches INT,
    PRIMARY KEY(height_id)
);

CREATE TABLE searches (
    searches_id INT NOT NULL,
    user_id INT,
    address_id INT,
    time_id INT,
    height_id INT,
    PRIMARY KEY(searches_id),

    FOREIGN KEY(user_id)
        REFERENCES users(user_id),

    FOREIGN KEY(address_id)
        REFERENCES addresses(address_id),

    FOREIGN KEY(time_id)
        REFERENCES times(time_id),

    FOREIGN KEY(height_id)
        REFERENCES heights(height_id)
);


