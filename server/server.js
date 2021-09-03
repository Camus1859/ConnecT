const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json({ extended: true }));

const { pool } = require('./src/db/config');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const PORT = process.env.PORT || 5000;

// app.use(session({
//     secret:'secret',
//     resave:false,
//     saveUninitialized: false,

// }))

// const TWO_HOURS = 1000 * 60 * 60 * 2;

// const {
//     PORT = 5000,
//     NODE_ENV = 'development',

//     SESS_SECRET = 'FLJALJDLAKJFDLJALDFJLJMLJ',
//     SESS_NAME = 'sid',
//     SESS_LIFETIME = TWO_HOURS,
// } = process.env;

// const IN_PROD = NODE_ENV === 'production';

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(
//     session({
//         name: SESS_NAME,
//         resave: false,
//         saveUninitialized: false,
//         secret: SESS_SECRET,
//         store: new pgSession({
//             pool: pool,
//         }),

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

    req.session.userId;
});

app.post('/signup', async (req, res) => {
    let { username, password, password2 } = req.body;

    let errors = [];

    if (!username || !password || !password2) {
        errors.push({ message: 'Please enter all fields' });
    }

    if (password.length < 6) {
        errors.push({ message: 'Password should be at least 6 characters' });
    }

    if (password != password2) {
        errors.push({ message: 'Passwords do not match' });
    }

    if (errors.length > 0) {
        res.send(errors);
    } else {
        //Form valididation has passed
        let hashpassword = await bcrypt.hash(password, 10);

        pool.query(
            `SELECT * FROM users
            WHERE user_name =$1`,
            [username],
            (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results.rows);

                if (results.rows.length > 0) {
                    errors.push({ message: 'Email Already Registered' });
                    res.send(errors);
                } else {
                    pool.query(
                        `INSERT INTO users (user_name, password)
                        VALUES ($1, $2)
                        RETURNING id, password`,
                        [username, hashpassword],
                        (err, results) => {
                            if (err) {
                                throw err;
                            }
                            console.log('ran');
                            res.send({
                                registered_msg:
                                    'You are now registered, please log in',
                            });
                        }
                    );
                }
            }
        );
    }
});

app.get('/', (req, res) => {
    console.log(req.session);

    const { userId } = req.session;
    console.log(userId);
});

app.post('/logout', (req, res) => {});

app.listen(PORT, () => {
    console.log('server started on port 5000');
});
