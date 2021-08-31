const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./src/db/config');
const session = require('express-session');
const PORT = 5000;

app.use(cors());
app.use(express.json());

// const TWO_HOURS = 1000 * 60 * 60 * 2;

// let {
//     PORT = 5000,
//     NODE_ENV = 'development',

//     SESS_NAME = 'sid',
//     SESS_LIFETIME = TWO_HOURS,
// } = process.env;

// const IN_PROD = NODE_ENV === 'production';

//  SESS_LIFETIME = TWO_HOURS;
// ('jalkdjlfajkdjf;lajdkljakl;jflakjf;ljadljf;aljkd;lfjadf');
// SESS_SECRET = app.use(cors);
// app.use(express.json());
// app.use(
//     session({
//         name: SESS_NAME,
//         resave: false,
//         saveUninitialized: false,
//         secret: SESS_SECRET,
//         cookie: {
//             maxAge: SESS_LIFETIME,
//             sameSite: true,
//             secure: IN_PROD,
//         },
//     })
// );

app.post('/login', (req, res) => {
    console.log('User Enters Email and password to login ');
    console.log(req.body);
});

app.post('/register', (req, res) => {
    console.log('User attempts to register');
    console.log(req.body);
});

app.get('/home', () => {});

app.get('/login', () => {});

app.get('/register', () => {});

app.post('/login', () => {});

app.post('/logout', () => {});

app.listen(PORT, () => {
    console.log('server started on port 5000');
});
